<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use OpenApi\Annotations as OA;
use Nelmio\ApiDocBundle\Annotation\Model;
use Nelmio\ApiDocBundle\Annotation\Security;

#[Route('/api/user', name: 'user_')]
class UserController extends AbstractController
{

    private SerializerInterface $serializer;
    private UserRepository $userRepository;
    private UserPasswordHasherInterface $passwordHasher;

    public function __construct(SerializerInterface $serializer,UserRepository $userRepository,UserPasswordHasherInterface $passwordHasher)
    {
        $this->serializer=$serializer;
        $this->userRepository=$userRepository;
        $this->passwordHasher=$passwordHasher;
    }


    /**
     * List the rewards of the specified user.
     *
     * This call takes into account all confirmed awards, but not pending or refused awards.
     *
     * @Route("/login", methods={"POST"})
     * @OA\Response(
     *     response=200,
     *     description="Returns the rewards of an user",
     *     @OA\JsonContent(
     *        type="array",
     *        @OA\Items(ref=@Model(type=User::class, groups={"User:read"}))
     *     )
     * )
     * @OA\Parameter(
     *     name="order",
     *     in="query",
     *     description="The field used to order rewards",
     *     @OA\Schema(type="string")
     * )
     * @OA\Tag(name="rewards")
     */
    public function login(Request $request): Response
    {
        $email=$request->toArray()["email"] ?? null;
        $password=$request->toArray()["password"] ?? null;

        if(!$email || !$password){
            throw new BadRequestHttpException("L'email ou le mot de passe n'est pas renseigné");
        }

        $user=$this->userRepository->findOneBy(["email"=> $email]);

        if(!$user){
            throw new BadRequestHttpException("Aucun compte pour cette email");
        }

        if(!$this->passwordHasher->isPasswordValid($user,$password)){
            throw new BadRequestHttpException("Mauvais mot de passe");
        }

        return $this->json($user,201,[],["groups" => ["User:read","Collocation:read"]]);
    }

    #[Route('', name: 'create',methods:["POST"])]
    public function create(Request $request): Response
    {
        $user = $this->serializer->deserialize($request->getContent(), User::class, "json");
        $hashedPassword = $this->passwordHasher->hashPassword(
            $user,
            $request->toArray()["password"]
        );
        $user->setPassword($hashedPassword);
        $this->userRepository->save($user,true);
        
        return $this->json($user,201,[],["groups" => ["User:read","Collocation:read"]]);
    }

    #[Route('/{user}', name: 'get',methods:["GET"])]
    public function get(User $user): Response
    {   
        return $this->json($user,200,[],["groups" => ["User:read"]]);
    }

    #[Route('/{user}', name: 'update',methods:["PUT"])]
    public function update(User $user,Request $request): Response
    {
        $email=$request->toArray()["email"] ?? null;
        if($email){
            throw new BadRequestHttpException("L'email ne peut pas être modifié");
        }
        $this->serializer->deserialize($request->getContent(), User::class, "json", ["groups" => ["User:read"], AbstractNormalizer::OBJECT_TO_POPULATE => $user]);
        $password=$request->toArray()["password"] ?? null;
        if($password){
            $hashedPassword = $this->passwordHasher->hashPassword(
                $user,
                $password
            );
            $user->setPassword($hashedPassword);
        }
        $this->userRepository->save($user,true);
        
        return $this->json($user,200,[],["groups" => ["User:read","Collocation:read"]]);
    }
}
