<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;
use Symfony\Component\Serializer\SerializerInterface;
use OpenApi\Annotations as OA;
use Nelmio\ApiDocBundle\Annotation\Model;
use Nelmio\ApiDocBundle\Annotation\Security;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class SecurityController extends AbstractController
{

    private SerializerInterface $serializer;
    private UserPasswordHasherInterface $passwordHasher;
    private UserRepository $userRepository;

    public function __construct(SerializerInterface $serializer,UserPasswordHasherInterface $passwordHasher,UserRepository $userRepository)
    {
        $this->serializer=$serializer;
        $this->passwordHasher=$passwordHasher;
        $this->userRepository=$userRepository;
    }


    /**
     * Connexion d'un utilisateur
     * 
     * Permet de savoir si la pair email mot de passe est assigné à un utilisateur
     *
     * @Route("/api/login", methods={"POST"},name="login")
     * @OA\Response(
     *     response=200,
     *     description="Retourne un jwt Token dans le format {token:'jwt token'}",
     * )
     * @OA\Parameter(
     *     name="email",
     *     in="header",
     *     required=true,
     *     description="L'email de l'utilisateur",
     *     @OA\Schema(type="string")
     * )
     * @OA\Parameter(
     *     name="password",
     *     in="header",
     *     required=true,
     *     description="Le mot de passe de l'utilisateur",
     *     @OA\Schema(type="string")
     * )
     * 
     * @OA\Tag(name="Auth")
     * @Security()
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

        return $this->json($user,200,[],["groups" => ["User:read","Collocation:read"]]);
    }

    /**
     * Création d'un utilisateur
     *
     *
     * @Route("/api/register", methods={"POST"})
     * @OA\Response(
     *     response=201,
     *     description="Retourne l'utilisateur créer",
     *     @OA\JsonContent(
     *        type="array",
     *        @OA\Items(ref=@Model(type=User::class, groups={"User:read"}))
     *     )
     * )
     * @OA\Parameter(
     *     name="email",
     *     in="header",
     *     required=true,
     *     description="L'email de l'utilisateur",
     *     @OA\Schema(type="string")
     * )
     * @OA\Parameter(
     *     name="password",
     *     in="header",
     *     required=true,
     *     description="Le mot de passe de l'utilisateur",
     *     @OA\Schema(type="string")
     * )
     * @OA\Parameter(
     *     name="firstname",
     *     in="header",
     *     required=true,
     *     description="Prénom de l'utilisateur",
     *     @OA\Schema(type="string")
     * )
     * @OA\Parameter(
     *     name="lastname",
     *     in="header",
     *     required=true,
     *     description="Nom de l'utilisateur",
     *     @OA\Schema(type="string")
     * )
     * @OA\Tag(name="Auth")
     * @Security()
     */
    public function create(Request $request): Response
    {
        $email=$request->toArray()["email"] ?? "";
        $alreadyRegistred=$this->userRepository->findOneBy(["email"=>$email]);
        if($alreadyRegistred){
            throw new HttpException("Cette email à déjà un compte",409);
        }
        $user = $this->serializer->deserialize($request->getContent(), User::class, "json");
        $hashedPassword = $this->passwordHasher->hashPassword(
            $user,
            $request->toArray()["password"]
        );
        $user->setPassword($hashedPassword);
        $this->userRepository->save($user,true);
        return $this->json($user,201,[],["groups" => ["User:read","Collocation:read"]]);
    }
}
