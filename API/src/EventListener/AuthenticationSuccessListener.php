<?php
namespace App\EventListener;

use App\Entity\User;
use Lexik\Bundle\JWTAuthenticationBundle\Event\AuthenticationSuccessEvent;

class AuthenticationSuccessListener
{
/**
 * @param AuthenticationSuccessEvent $event
 */
public function onAuthenticationSuccessResponse(AuthenticationSuccessEvent $event)
{
    $data = $event->getData();
    $user = $event->getUser();

    if (!$user instanceof User) {
        return;
    }

    $data['data'] = array(
        'roles' => $user->getRoles(),
        'id' => $user->getId(),
        'email' => $user->getEmail(),
        'lastname' => $user->getLastname(),
        'firstname' => $user->getFirstname(),
        'colocation' => $user->getCollocation() ? $user->getCollocation()->getId():null,
        'points' => $user->getPoints(),
    );

    $event->setData($data);
}
}
