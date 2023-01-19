<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\UserRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: UserRepository::class)]
#[ORM\Table(name: '`user`')]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['User:read','Collocation:read',"Invitation:read","Service:read","Message:read"])]
    private ?int $id = null;

    #[ORM\Column(length: 180, unique: true)]
    #[Groups(['User:read','Collocation:read',"Invitation:read","Service:read","Message:read"])]
    private ?string $email = null;

    #[ORM\Column]
    private array $roles = [];

    /**
     * @var string The hashed password
     */
    #[ORM\Column]
    private ?string $password = null;

    #[ORM\Column(length: 255)]
    #[Groups(['User:read','Collocation:read',"Invitation:read","Service:read","Message:read"])]
    private ?string $firstname = null;

    #[ORM\Column(length: 255)]
    #[Groups(['User:read','Collocation:read',"Invitation:read","Service:read","Message:read"])]
    private ?string $lastname = null;

    #[ORM\Column]
    #[Groups(['User:read','Collocation:read',"Invitation:read","Service:read","Message:read"])]
    private ?int $points = null;

    #[ORM\ManyToOne(inversedBy: 'members',cascade: ['persist'])]
    #[Groups(['User:read',"Invitation:read","Service:read","Message:read"])]
    private ?Collocation $collocation = null;

    public function __construct()
    {
        $this->points=0;
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string) $this->email;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see PasswordAuthenticatedUserInterface
     */
    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    public function getFirstname(): ?string
    {
        return $this->firstname;
    }

    public function setFirstname(string $firstname): self
    {
        $this->firstname = $firstname;

        return $this;
    }

    public function getLastname(): ?string
    {
        return $this->lastname;
    }

    public function setLastname(string $lastname): self
    {
        $this->lastname = $lastname;

        return $this;
    }

    public function getPoints(): ?int
    {
        return $this->points;
    }

    public function setPoints(int $points): self
    {
        $this->points += $points;

        return $this;
    }

    /**
     * Remet à zéro les points de l'utilisateur
     *
     * @return self
     */
    public function resetPoints(): self
    {
        $this->points = 0;

        return $this;
    }

    public function getCollocation(): ?Collocation
    {
        return $this->collocation;
    }

    public function setCollocation(?Collocation $collocation): self
    {
        dump($collocation);
        $this->collocation = $collocation;

        return $this;
    }
}
