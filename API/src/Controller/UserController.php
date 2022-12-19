<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\CollocationRepository;
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
    private CollocationRepository $collocationRepository;
    private UserPasswordHasherInterface $passwordHasher;

    public function __construct(SerializerInterface $serializer, UserRepository $userRepository, UserPasswordHasherInterface $passwordHasher,CollocationRepository $collocationRepository)
    {
        $this->serializer = $serializer;
        $this->userRepository = $userRepository;
        $this->passwordHasher = $passwordHasher;
        $this->collocationRepository = $collocationRepository;
    }

    /**
     * Récupère les informations de l'utilisateur connecté
     *
     *
     * @Route("/whoami", methods={"GET"})
     * @OA\Response(
     *     response=200,
     *     description="Retourne l'utilisateur connecté",
     *     @OA\JsonContent(
     *        type="array",
     *        @OA\Items(ref=@Model(type=User::class, groups={"User:read"}))
     *     )
     * )
     * 
     * @OA\Tag(name="User")
     */
    public function whoami(): Response
    {
        return $this->json($this->getUser(), 200, [], ["groups" => ["User:read"]]);
    }

    // /**
    //  * Permet à l'utilisateur de quitter la collocation
    //  *
    //  *
    //  * @Route("/{user}/leaveCollocation", methods={"GET"})
    //  * @OA\Response(
    //  *     response=200,
    //  *     description="Retourne l'utilisateur donné",
    //  *     @OA\JsonContent(
    //  *        type="array",
    //  *        @OA\Items(ref=@Model(type=User::class, groups={"User:read"}))
    //  *     )
    //  * )
    //  * 
    //  * @OA\Tag(name="User")
    //  */
    // public function leaveColocation(User $user): Response
    // {
    //     $collocation=$user->getCollocation() ?? null;
    //     if(!$collocation){
    //         throw new BadRequestHttpException("L'utilisateur n'appartient à aucune collocation");
    //     }
    //     if($collocation->getManager()==$user){
    //         throw new BadRequestHttpException("Le manager ne peux pas quitter la collocation");
    //     }

    //     $collocation->removeMember($user);
    //     $this->collocationRepository->save($collocation);

    //     return $this->json($user, 200, [], ["groups" => ["User:read"]]);
    // }

        /**
     * Récupère les informations de l'utilisateur
     *
     *
     * @Route("/{user}", methods={"GET"})
     * @OA\Response(
     *     response=200,
     *     description="Retourne l'utilisateur donné",
     *     @OA\JsonContent(
     *        type="array",
     *        @OA\Items(ref=@Model(type=User::class, groups={"User:read"}))
     *     )
     * )
     * 
     * @OA\Tag(name="User")
     */
    public function get(User $user): Response
    {
        return $this->json($user, 200, [], ["groups" => ["User:read"]]);
    }

    /**
     * Récupère le total de points de l'utilisateur donné
     *
     *
     * @Route("/{user}/points", methods={"GET"})
     * @OA\Response(
     *     response=200,
     *     description="Retourne le nombre de point de l'utilisateur donné",
     *     @OA\JsonContent(
     *          @OA\Property(
     *              property="points",
     *              type="number",
     *              example=""
     *           )
     *     )
     * )
     * @OA\Tag(name="User")
     */
    public function getPoints(User $user, Request $request): Response
    {
        return $this->json(["points" => $user->getPoints()]);
    }

    /**
     * Met à jour un utilisateur
     *
     *
     * @Route("/{user}", methods={"PUT"})
     * @OA\Response(
     *     response=201,
     *     description="Retourne l'utilisateur mis à jour",
     *     @OA\JsonContent(
     *        type="array",
     *        @OA\Items(ref=@Model(type=User::class, groups={"User:read"}))
     *     )
     * )
     * @OA\Parameter(
     *     name="email",
     *     in="header",
     *     description="L'email de l'utilisateur",
     *     @OA\Schema(type="string")
     * )
     * @OA\Parameter(
     *     name="password",
     *     in="header",
     *     description="Le mot de passe de l'utilisateur",
     *     @OA\Schema(type="string")
     * )
     * @OA\Parameter(
     *     name="firstname",
     *     in="header",
     *     description="Prénom de l'utilisateur",
     *     @OA\Schema(type="string")
     * )
     * @OA\Parameter(
     *     name="lastname",
     *     in="header",
     *     description="Nom de l'utilisateur",
     *     @OA\Schema(type="string")
     * )
     * 
     * @OA\Tag(name="User")
     */
    public function update(User $user, Request $request): Response
    {
        $email = $request->toArray()["email"] ?? null;
        if ($email) {
            throw new BadRequestHttpException("L'email ne peut pas être modifié");
        }
        $this->serializer->deserialize($request->getContent(), User::class, "json", ["groups" => ["User:read"], AbstractNormalizer::OBJECT_TO_POPULATE => $user]);
        $password = $request->toArray()["password"] ?? null;
        if ($password) {
            $hashedPassword = $this->passwordHasher->hashPassword(
                $user,
                $password
            );
            $user->setPassword($hashedPassword);
        }
        $this->userRepository->save($user, true);

        return $this->json($user, 200, [], ["groups" => ["User:read", "Collocation:read"]]);
    }
}
