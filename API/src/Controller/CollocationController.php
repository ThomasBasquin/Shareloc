<?php

namespace App\Controller;

use App\Entity\Collocation;
use App\Entity\User;
use App\Entity\Message;
use App\Repository\CollocationRepository;
use App\Repository\MessageRepository;
use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use OpenApi\Annotations as OA;
use Nelmio\ApiDocBundle\Annotation\Model;
use Nelmio\ApiDocBundle\Annotation\Security;

#[Route('/api/collocation', name: 'collocation_')]
class CollocationController extends AbstractController
{

    private SerializerInterface $serializer;
    private CollocationRepository $collocationRepository;
    private UserRepository $userRepository;
    private MessageRepository $messageRepository;

    public function __construct(SerializerInterface $serializer,CollocationRepository $collocationRepository,UserRepository $userRepository,MessageRepository $messageRepository)
    {
        $this->serializer=$serializer;
        $this->collocationRepository=$collocationRepository;
        $this->userRepository=$userRepository;
        $this->messageRepository=$messageRepository;
    }

    /**
     * Créer une collocation
     *
     *
     * @Route("", methods={"POST"})
     * @OA\Response(
     *     response=201,
     *     description="Retourne la collocation créee",
     *     @OA\JsonContent(
     *        type="array",
     *        @OA\Items(ref=@Model(type=Collocation::class, groups={"Collocation:read"}))
     *     )
     * )
     * @OA\Parameter(
     *     name="name",
     *     in="header",
     *     required=true,
     *     description="Nom de la collocation",
     *     @OA\Schema(type="string")
     * )
     * @OA\Parameter(
     *     name="manager",
     *     in="header",
     *     required=true,
     *     description="Id du manager",
     *     @OA\Schema(type="number")
     * )
     * 
     * @OA\Tag(name="Collocation")
     */
    public function create(Request $request): Response
    {
        /** @var Collocation */
        $collocation = $this->serializer->deserialize($request->getContent(), Collocation::class, "json");
        $managerId=$request->toArray()["manager"] ?? null;
        if($managerId){
            $manager=$this->userRepository->findOneBy(["id"=>$managerId]);
            if(!$manager){
                throw new BadRequestHttpException("Aucun utilisateur trouvé pour le manager");
            }
            $collocation->setManager($manager);
            $collocation->addMember($manager);
        }
        $this->collocationRepository->save($collocation,true);
        
        return $this->json($collocation,201,[],["groups" => ["Collocation:read"]]);
    }

    /**
     * Met à jour une collocation
     *
     *
     * @Route("/{collocation}", methods={"PUT"})
     * @OA\Response(
     *     response=201,
     *     description="Retourne la collocation mis à jour",
     *     @OA\JsonContent(
     *        type="array",
     *        @OA\Items(ref=@Model(type=Collocation::class, groups={"Collocation:read"}))
     *     )
     * )
     * @OA\Parameter(
     *     name="name",
     *     in="header",
     *     required=true,
     *     description="Nom de la collocation",
     *     @OA\Schema(type="string")
     * )
     * 
     * @OA\Tag(name="Collocation")
     */
    public function update(Collocation $collocation,Request $request): Response
    {
        $members=$request->toArray()["members"] ?? null;
        $manager=$request->toArray()["manager"] ?? null;

        if($members || $manager){
            throw new BadRequestHttpException("On ne peux pas modifier le manager ou les membres avec ses routes");
        }
        $this->serializer->deserialize($request->getContent(), Collocation::class, "json", ["groups" => ["Collocation:read"], AbstractNormalizer::OBJECT_TO_POPULATE => $collocation]);
        $this->collocationRepository->save($collocation,true);
        
        return $this->json($collocation,200,[],["groups" => ["Collocation:read"]]);
    }

    
    /**
     * Supprimer un membre de la collocation
     *
     *
     * @Route("/{collocation}/member/{member}", methods={"DELETE"})
     * @OA\Response(
     *     response=201,
     *     description="Retourne la collocation mis à jour",
     *     @OA\JsonContent(
     *        type="array",
     *        @OA\Items(ref=@Model(type=Collocation::class, groups={"Collocation:read"}))
     *     )
     * )
     * 
     * @OA\Tag(name="Collocation")
     */
    public function deleteMember(Collocation $collocation,User $member): Response
    {
        if($collocation->getManager()===$member){
            throw new BadRequestHttpException("On ne peut pas viré le manager de la collocation");
        }
        if($collocation->getManager()==$this->getUser()){
            throw new BadRequestHttpException("Il n'y a quel le manager qui peut virer des membres");
        }
        $member->resetPoints();
        $collocation->removeMember($member);

        $this->collocationRepository->save($collocation,true);
        
        return $this->json($collocation,200,[],["groups" => ["Collocation:read"]]);
    }

    /**
     * Récupérer les message d'une collocation
     * 
     * les messages sont triés du plus vieux au plus récent
     *
     *
     * @Route("/{collocation}/messages", methods={"GET"})
     * @OA\Response(
     *     response=200,
     *     description="Retourne le message de la collocation",
     *     @OA\JsonContent(
     *        type="array",
     *        @OA\Items(ref=@Model(type=Message::class, groups={"Message:read"}))
     *     )
     * )
     * 
     * @OA\Tag(name="Collocation")
     */
    public function getMessageFromCollocation(Collocation $collocation): Response
    {
        $messages=$this->messageRepository->findBy(["collocation"=>$collocation],["sendAt"=>"DESC"]);
        
        return $this->json($messages,200,[],["groups" => ["Message:read"]]);
    }
}
