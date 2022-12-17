<?php

namespace App\Controller;

use App\Entity\Collocation;
use App\Entity\Invitation;
use App\Entity\User;
use App\Repository\CollocationRepository;
use App\Repository\InvitationRepository;
use App\Repository\UserRepository;
use DateTimeImmutable;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;

#[Route('/api/invitation', name: 'invitation_')]
class InvitationController extends AbstractController
{

    private SerializerInterface $serializer;
    private InvitationRepository $invitationRepository;
    private CollocationRepository $collocationRepository;
    private UserRepository $userRepository;

    public function __construct(SerializerInterface $serializer, CollocationRepository $collocationRepository, UserRepository $userRepository, InvitationRepository $invitationRepository)
    {
        $this->serializer = $serializer;
        $this->collocationRepository = $collocationRepository;
        $this->userRepository = $userRepository;
        $this->invitationRepository = $invitationRepository;
    }

    #[Route('', name: 'create', methods: ["POST"])]
    public function create(Request $request): Response
    {
        /** @var Invitation */
        $invitation = $this->serializer->deserialize($request->getContent(), Invitation::class, "json");
        $senderId = $request->toArray()["sender"] ?? null;
        $receipterId = $request->toArray()["receipter"] ?? null;
        $collocationId = $request->toArray()["collocation"] ?? null;
        if (!$collocationId) {
            throw new BadRequestHttpException("La collocation n'est renseigné");
        }
        $collocation = $this->collocationRepository->findOneBy(["id" => $collocationId]);

        if (!$collocation) {
            throw new BadRequestHttpException("La collocation n'existe pas");
        }
        $invitation->setCollocation($collocation);
        if (!$senderId || !$receipterId) {
            throw new BadRequestHttpException("L'envoyeur et le receptionneur ne sont pas renseigné");
        }
        if ($senderId == $receipterId) {
            throw new BadRequestHttpException("L'utilisateur ne peut pas s'envoyer d'invitation à lui même");
        }
        /** @var User */
        $sender = $this->userRepository->findOneBy(["id" => $senderId]);
        /** @var User */
        $receipter = $this->userRepository->findOneBy(["id" => $receipterId]);
        if (!$sender || !$receipter) {
            throw new BadRequestHttpException("L'utilisateur n'existe pas");
        }
        if ($sender->getCollocation()->getManager()->getId() !== $senderId) {
            throw new BadRequestHttpException("Il n'y a que le manager qui peut envoyer des invitations");
        }
        if ($receipter->getCollocation()) {
            throw new BadRequestHttpException("Le récéptionneur est déjà dans une collocation");
        }

        $invitation->setReceipter($receipter);
        $invitation->setSender($sender);

        $this->invitationRepository->save($invitation, true);

        return $this->json($invitation, 201, [], ["groups" => ["Invitation:read"]]);
    }

    #[Route('/{invitation}/replied', name: 'repliedInvitation', methods: ["PUT"])]
    public function update(Invitation $invitation, Request $request): Response
    {
        $accepted = $request->toArray()["accepted"] ?? null;

        if ($accepted == null) {
            throw new BadRequestHttpException("Le champ accepted n'est pas renseigné");
        }

        $invitation->setAccepted($accepted);
        $invitation->setRepliedAt(new DateTimeImmutable());

        if ($accepted) {
            $invitation->getCollocation()->addMember($invitation->getReceipter());

            $this->collocationRepository->save($invitation->getCollocation(), true);
        }

        $this->invitationRepository->save($invitation, true);

        return $this->json($invitation, 200, [], ["groups" => ["Invitation:read"]]);
    }
}
