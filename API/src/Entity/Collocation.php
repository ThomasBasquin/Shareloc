<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\CollocationRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: CollocationRepository::class)]
#[ORM\Table(name: '`collocation`')]
class Collocation
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['Collocation:read',"User:read"])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['Collocation:read',"User:read"])]
    private ?string $name = null;

    #[ORM\OneToOne(cascade: ['persist', 'remove'])]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['Collocation:read'])]
    private ?User $manager = null;

    #[ORM\OneToMany(mappedBy: 'collocation', targetEntity: User::class)]
    #[Groups(['Collocation:read'])]
    private Collection $members;

    public function __construct()
    {
        $this->members = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getManager(): ?User
    {
        return $this->manager;
    }

    public function setManager(User $manager): self
    {
        $this->manager = $manager;

        return $this;
    }

    /**
     * @return Collection<int, User>
     */
    public function getMembers(): Collection
    {
        return $this->members;
    }

    public function addMember(User $member): self
    {
        if (!$this->members->contains($member)) {
            $this->members->add($member);
            $member->setCollocation($this);
        }

        return $this;
    }

    public function removeMember(User $member): self
    {
        if ($this->members->removeElement($member)) {
            // set the owning side to null (unless already changed)
            if ($member->getCollocation() === $this) {
                $member->setCollocation(null);
            }
        }

        return $this;
    }
}
