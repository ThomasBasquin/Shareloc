<?php

namespace App\Controller;

use App\Entity\Collocation;
use App\Entity\User;
use App\Repository\CollocationRepository;
use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;

#[Route('/collocation', name: 'collocation_')]
class CollocationController extends AbstractController
{

    private SerializerInterface $serializer;
    private CollocationRepository $collocationRepository;
    private UserRepository $userRepository;

    public function __construct(SerializerInterface $serializer,CollocationRepository $collocationRepository,UserRepository $userRepository)
    {
        $this->serializer=$serializer;
        $this->collocationRepository=$collocationRepository;
        $this->userRepository=$userRepository;
    }

    #[Route('', name: 'create',methods:["POST"])]
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

    #[Route('/{collocation}', name: 'update',methods:["PUT"])]
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

    #[Route('/{collocation}/member/{member}', name: 'add_member',methods:["GET"])]
    public function addMember(Collocation $collocation,User $member): Response
    {
        $collocation->addMember($member);

        $this->collocationRepository->save($collocation,true);
        
        return $this->json($collocation,200,[],["groups" => ["Collocation:read"]]);
    }

    #[Route('/{collocation}/member/{member}', name: 'delete_member',methods:["DELETE"])]
    public function deleteMember(Collocation $collocation,User $member): Response
    {
        if($collocation->getManager()===$member){
            throw new BadRequestHttpException("On ne peut pas viré le manager de la collocation");
        }
        $collocation->removeMember($member);

        $this->collocationRepository->save($collocation,true);
        
        return $this->json($collocation,200,[],["groups" => ["Collocation:read"]]);
    }
}
