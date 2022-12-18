<?php

namespace App\Entity;

use App\Repository\ServiceRepository;
use DateTimeImmutable;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: ServiceRepository::class)]
class Service
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['Service:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['Service:read'])]
    private ?string $title = null;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['Service:read'])]
    private ?Collocation $collocation = null;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['Service:read'])]
    private ?User $recipient = null;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['Service:read'])]
    private ?User $performer = null;

    #[ORM\Column]
    #[Groups(['Service:read'])]
    private ?\DateTimeImmutable $createdAt = null;

    #[ORM\Column(nullable: true)]
    #[Groups(['Service:read'])]
    private ?\DateTimeImmutable $validatedAt = null;

    #[ORM\Column]
    #[Groups(['Service:read'])]
    private ?int $cost = null;

    public function __construct()
    {
        $this->createdAt=new DateTimeImmutable();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;

        return $this;
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

    public function getRecipient(): ?User
    {
        return $this->recipient;
    }

    public function setRecipient(?User $recipient): self
    {
        $this->recipient = $recipient;

        return $this;
    }

    public function getPerformer(): ?User
    {
        return $this->performer;
    }

    public function setPerformer(?User $performer): self
    {
        $this->performer = $performer;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeImmutable $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getValidatedAt(): ?\DateTimeImmutable
    {
        return $this->validatedAt;
    }

    public function setValidatedAt(?\DateTimeImmutable $validatedAt): self
    {
        $this->validatedAt = $validatedAt;

        return $this;
    }

    public function getCost(): ?int
    {
        return $this->cost;
    }

    public function setCost(int $cost): self
    {
        $this->cost = $cost;

        return $this;
    }
}
