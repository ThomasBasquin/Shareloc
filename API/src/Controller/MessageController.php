<?php

namespace App\Controller;

use App\Entity\Collocation;
use App\Entity\Message;
use App\Entity\User;
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

#[Route('/api/message', name: 'message_')]
class MessageController extends AbstractController
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
     * Créer une Message
     *
     *
     * @Route("", methods={"POST"})
     * @OA\Response(
     *     response=201,
     *     description="Retourne le message crée",
     *     @OA\JsonContent(
     *        type="array",
     *        @OA\Items(ref=@Model(type=Message::class, groups={"Message:read"}))
     *     )
     * )
     * @OA\Parameter(
     *     name="collocation",
     *     in="header",
     *     required=true,
     *     description="id de la collocation",
     *     @OA\Schema(type="number")
     * )
     * @OA\Parameter(
     *     name="sender",
     *     in="header",
     *     required=true,
     *     description="Id de l'envoyeur",
     *     @OA\Schema(type="number")
     * )
     * @OA\Parameter(
     *     name="message",
     *     in="header",
     *     required=true,
     *     description="message envoyé",
     *     @OA\Schema(type="string")
     * )
     * 
     * @OA\Tag(name="Message")
     */
    public function create(Request $request): Response
    {
        /** @var Message */
        $message = $this->serializer->deserialize($request->getContent(), Message::class, "json");
        $senderId=$request->toArray()["sender"] ?? null;
        $collocationId=$request->toArray()["collocation"] ?? null;
        if(!$senderId){
            throw new BadRequestHttpException("L'envoyeur n'est pas renseigné");
        }
        if(!$collocationId){
            throw new BadRequestHttpException("La collocation n'est pas renseignée");
        }
        $sender=$this->userRepository->findOneBy(["id"=>$senderId]);
        if(!$sender){
            throw new BadRequestHttpException("Aucun utilisateur trouvé pour l'envoyeur");
        }
        $collocation=$this->collocationRepository->findOneBy(["id"=>$collocationId]);
        if(!$collocation){
            throw new BadRequestHttpException("Aucune collocation trouvée");
        }
        if($sender->getCollocation()!==$collocation){
            throw new BadRequestHttpException("L'envoyeur doit être dans la collocation renseigné");
        }
        $message->setCollocation($collocation);
        $message->setSender($sender);

        $this->messageRepository->save($message,true);
        
        return $this->json($message,201,[],["groups" => ["Message:read"]]);
    }
}
