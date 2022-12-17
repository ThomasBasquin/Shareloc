<?php

namespace App\Entity;

use App\Repository\InvitationRepository;
use DateTimeImmutable;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: InvitationRepository::class)]
class Invitation
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['Invitation:read'])]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'invitations',cascade:["persist"])]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['Invitation:read'])]
    private ?Collocation $collocation = null;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['Invitation:read'])]
    private ?User $sender = null;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['Invitation:read'])]
    private ?User $receipter = null;

    #[ORM\Column]
    #[Groups(['Invitation:read'])]
    private ?\DateTimeImmutable $sendAt = null;

    #[ORM\Column(nullable: true)]
    #[Groups(['Invitation:read'])]
    private ?\DateTimeImmutable $repliedAt = null;

    #[ORM\Column(nullable: true)]
    #[Groups(['Invitation:read'])]
    private ?bool $accepted = null;

    public function __construct()
    {
        $this->sendAt=new DateTimeImmutable();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCollocation(): ?Collocation
    {
        return $this->collocation;
    }

    public function setCollocation(?Collocation $collocation): self
    {
        $this->collocation = $collocation;

        return $this;
    }

    public function getSender(): ?User
    {
        return $this->sender;
    }

    public function setSender(?User $sender): self
    {
        $this->sender = $sender;

        return $this;
    }

    public function getReceipter(): ?User
    {
        return $this->receipter;
    }

    public function setReceipter(?User $receipter): self
    {
        $this->receipter = $receipter;

        return $this;
    }

    public function getSendAt(): ?\DateTimeImmutable
    {
        return $this->sendAt;
    }

    public function setSendAt(\DateTimeImmutable $sendAt): self
    {
        $this->sendAt = $sendAt;

        return $this;
    }

    public function getRepliedAt(): ?\DateTimeImmutable
    {
        return $this->repliedAt;
    }

    public function setRepliedAt(\DateTimeImmutable $repliedAt): self
    {
        $this->repliedAt = $repliedAt;

        return $this;
    }

    public function isAccepted(): ?bool
    {
        return $this->accepted;
    }

    public function setAccepted(?bool $accepted): self
    {
        $this->accepted = $accepted;

        return $this;
    }
}
