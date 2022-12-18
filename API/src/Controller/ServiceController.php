<?php

namespace App\Controller;

use App\Entity\Service;
use App\Repository\CollocationRepository;
use App\Repository\ServiceRepository;
use App\Repository\UserRepository;
use DateTimeImmutable;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use OpenApi\Annotations as OA;
use Nelmio\ApiDocBundle\Annotation\Model;
use Nelmio\ApiDocBundle\Annotation\Security;

#[Route('/api/service', name: 'service_')]
class ServiceController extends AbstractController
{
    private SerializerInterface $serializer;
    private ServiceRepository $serviceRepository;
    private UserRepository $userRepository;
    private CollocationRepository $collocationRepository;

    public function __construct(SerializerInterface $serializer, ServiceRepository $serviceRepository, UserRepository $userRepository, CollocationRepository $collocationRepository)
    {
        $this->serializer = $serializer;
        $this->serviceRepository = $serviceRepository;
        $this->userRepository = $userRepository;
        $this->collocationRepository = $collocationRepository;
    }

    /**
     * Créer un service
     *
     * @Route("", methods={"POST"})
     * @OA\Response(
     *     response=201,
     *     description="Retourne le service crée",
     *     @OA\JsonContent(
     *        type="array",
     *        @OA\Items(ref=@Model(type=Service::class, groups={"Service:read"}))
     *     )
     * )
     * @OA\Parameter(
     *     name="title",
     *     in="header",
     *     required=true,
     *     description="Titre du service",
     *     @OA\Schema(type="string")
     * )
     * @OA\Parameter(
     *     name="collocation",
     *     in="header",
     *     required=true,
     *     description="Id de la collocation",
     *     @OA\Schema(type="number")
     * )
     * @OA\Parameter(
     *     name="recipient",
     *     in="header",
     *     required=true,
     *     description="Id du bénéficiaire du service",
     *     @OA\Schema(type="number")
     * )
     * @OA\Parameter(
     *     name="performer",
     *     in="header",
     *     required=true,
     *     description="Id de l'exécutant du service",
     *     @OA\Schema(type="number")
     * )
     * @OA\Parameter(
     *     name="cost",
     *     in="header",
     *     required=true,
     *     description="Coût du service",
     *     @OA\Schema(type="number")
     * )
     * 
     * @OA\Tag(name="Service")
     */
    public function create(Request $request): Response
    {   
        /** @var Service */
        $service = $this->serializer->deserialize($request->getContent(), Service::class, "json");
        $recipientId = $request->toArray()["recipient"] ?? null;
        $performerId = $request->toArray()["performer"] ?? null;
        $collocationId = $request->toArray()["collocation"] ?? null;
        if (!$collocationId) {
            throw new BadRequestHttpException("La collocation n'est pas renseigné");
        }
        if (!$performerId) {
            throw new BadRequestHttpException("L'exécutant n'est pas renseigné");
        }
        if (!$recipientId) {
            throw new BadRequestHttpException("Le bénéficiaire n'est pas renseigné");
        }
        $collocation = $this->collocationRepository->findOneBy(["id" => $collocationId]);
        if (!$collocation) {
            throw new BadRequestHttpException("Aucune collocation trouvée");
        }
        $recipient = $this->userRepository->findOneBy(["id" => $recipientId]);
        if (!$recipient) {
            throw new BadRequestHttpException("Aucun bénéficiaire trouvé");
        }
        $performer = $this->userRepository->findOneBy(["id" => $performerId]);
        if (!$performer) {
            throw new BadRequestHttpException("Aucun exécutant trouvé");
        }
        if ($recipientId == $performerId) {
            throw new BadRequestHttpException("L'exécutant et le bénéficiaire ne peuvent pas être la même personne");
        }
        $service->setRecipient($recipient);
        $service->setPerformer($performer);
        $service->setCollocation($collocation);

        $this->serviceRepository->save($service, true);

        return $this->json($service, 201, [], ["groups" => ["Service:read"]]);
    }

    /**
     * Valide la réalisation du service
     *
     *
     * @Route("/{service}/valid", methods={"PUT"})
     * @OA\Response(
     *     response=200,
     *     description="Retourne le service réalisé",
     *     @OA\JsonContent(
     *        type="array",
     *        @OA\Items(ref=@Model(type=Service::class, groups={"Service:read"}))
     *     )
     * )
     * 
     * @OA\Tag(name="Service")
     */
    public function valid(Service $service): Response
    {
        if($service->getValidatedAt()){
            throw new BadRequestHttpException("Le service est déjà validé");
        }
        $service->setValidatedAt(new DateTimeImmutable());
        $service->getPerformer()->setPoints($service->getCost());
        $service->getRecipient()->setPoints(-$service->getCost());

        $this->serviceRepository->save($service,true);

        return $this->json($service, 200, [], ["groups" => ["Service:read"]]);
    }
}
