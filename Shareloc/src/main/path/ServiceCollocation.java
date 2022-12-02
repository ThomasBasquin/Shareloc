package main.path;

import main.controller.*;
import main.model.*;
import main.security.SigninNeeded;

import java.util.List;

import javax.json.JsonObject;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;

import javax.ws.rs.core.Response.Status;


@Path("/collocations")
public class ServiceCollocation {

	/**
	 * Renvoie toutes les collocations
	 * @param security Contexte de s�curit�
	 * @return Liste de toutes les collocations
	 */
	@GET
	@SigninNeeded
	@Produces(MediaType.APPLICATION_JSON)
	public List<Collocation> getCollocations(@Context SecurityContext security) {
		return ControllerCollocation.getUserCollocations(Long.parseLong(security.getUserPrincipal().getName()));
	}

	/**
	 * Renvoie la collocation d'id pass� en parametre
	 * @param id Id de la collocation
	 * @return Collocation
	 */
	@GET
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Collocation getCollocation(@PathParam("id") Long id) {
		return ControllerCollocation.getCollocation(id);
	}

	/**
	 * Cr�er une collocation avec les informations du body
	 * @param security Contexte de securit�
	 * @param collocation Informations de la collocation a cr�er
	 * @return Colocation nouvellement cr�e
	 */
	@POST
	@SigninNeeded
	@Path("/create")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response createCollocation(@Context SecurityContext security, Collocation collocation) {
		User user = ControllerUser.getUser(Long.parseLong(security.getUserPrincipal().getName()));
		Collocation c = ControllerCollocation.createCollocation(collocation);
		return Response.status(Status.CREATED).entity(c).build();
	}

	/**
	 * Renvoie toutes les invitations d'une colocation
	 * @param security Contexte de s�curit�
	 * @param collocationId Id de la collocation
	 * @return Liste des invitations
	 */
	@GET
	@SigninNeeded
	@Path("/{collocationId}/invitations")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getCollocationInvitations(@Context SecurityContext security,
			@PathParam("collocationId") Long collocationId) {
		User user = ControllerUser.getUser(Long.parseLong(security.getUserPrincipal().getName()));
		if (ControllerCollocation.isCollocationManager(user, collocationId)) {
			return Response.status(Status.OK).entity(ControllerInvitation.getCollocationInvitations(collocationId))
					.build();
		} else
			return Response.status(Status.UNAUTHORIZED).build();
	}

	/**
	 * Renvoie les liste des utilisateurs qui ne font pas partie de cette colocation
	 * et qui n'ont pas d'invitation en cours pour cette derniere
	 * @param security Contexte de s�curit�
	 * @param collocationId Id de la colocation
	 * @return Liste d'invitation
	 */
	@GET
	@SigninNeeded
	@Path("/{collocationId}/invitable")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getCollocationInvitableUsers(@Context SecurityContext security,
			@PathParam("collocationId") Long collocationId) {
		User user = ControllerUser.getUser(Long.parseLong(security.getUserPrincipal().getName()));
		if (ControllerCollocation.isCollocationManager(user, collocationId)) {
			return Response.status(Status.OK).entity(ControllerUser.getCollocationInvitableUsers(collocationId))
					.build();
		} else
			return Response.status(Status.UNAUTHORIZED).build();
	}

	/**
	 * Renvoie la liste des membres de la colocation
	 * @param security Contexte de securit�
	 * @param collocationId Id de la colocation
	 * @return Liste d'utilisateur
	 */
	@GET
	@SigninNeeded
	@Path("/{collocationId}/users")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getCollocationMembers(@Context SecurityContext security,
			@PathParam("collocationId") Long collocationId) {
		User user = ControllerUser.getUser(Long.parseLong(security.getUserPrincipal().getName()));
		if (ControllerCollocation.isCollocationMember(user, collocationId)) {
			return Response.status(Status.OK).entity(ControllerUser.getCollocationUsers(collocationId)).build();
		} else
			return Response.status(Status.UNAUTHORIZED).build();
	}

	/**
	 * Invite l'utilisateur a la colocation
	 * @param security Contexte de securit�
	 * @param collocationId Id de la colocation
	 * @param userId Id de l'utilisateur a inviter
	 * @return Response
	 */
	@GET
	@SigninNeeded
	@Path("{collocationId}/invite/{userId}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response inviteUserToCollocation(@Context SecurityContext security,
			@PathParam("collocationId") Long collocationId, @PathParam("userId") Long userId) {
		User user = ControllerUser.getUser(Long.parseLong(security.getUserPrincipal().getName()));
		if (ControllerCollocation.isCollocationManager(user, collocationId)) {
			Invitation i = ControllerInvitation.createInvitation(collocationId, userId, user);
			if (i == null)
				return Response.status(Status.CONFLICT).build();
			return Response.status(Status.CREATED).build();
		} else
			return Response.status(Status.UNAUTHORIZED).build();
	}

	/**
	 * Renvoie la liste des services aprouv�s de la colocation
	 * @param security Contexte de securit�
	 * @param collocationId Id de la colocation
	 * @return Liste de service
	 */
	@GET
	@SigninNeeded
	@Path("{collocationId}/services")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getCollocationServices(@Context SecurityContext security,
			@PathParam("collocationId") Long collocationId) {
		User user = ControllerUser.getUser(Long.parseLong(security.getUserPrincipal().getName()));
		if (ControllerCollocation.isCollocationMember(user, collocationId)) {
			return Response.status(Status.OK).entity(ControllerService.getCollocationApprovedServices(collocationId))
					.build();
		} else
			return Response.status(Status.UNAUTHORIZED).build();
	}

	/**
	 * Cr�er un service (et une proposition d'ajout) avec les informations pass� dans le body
	 * @param security Contexte de securit�
	 * @param collocationId Id de la colocation
	 * @param service Informations de creation du service
	 * @return Service nouvellement cr�e
	 */
	@POST
	@SigninNeeded
	@Path("{collocationId}/services/create")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response createService(@Context SecurityContext security, @PathParam("collocationId") Long collocationId,
			Service service) {
		User user = ControllerUser.getUser(Long.parseLong(security.getUserPrincipal().getName()));
		if (ControllerCollocation.isCollocationMember(user, collocationId)) {
			Service s = ControllerService.createService(service, collocationId);
			return Response.status(Status.CREATED).entity(s).build();
		} else
			return Response.status(Status.UNAUTHORIZED).build();
	}

	/**
	 * Renvoie le service qui a l'id pass� en parametre dans une colocation precise
	 * @param security Contexte de securit�
	 * @param collocationId Id de la colocation
	 * @param serviceId Id du service recherch�
	 * @return Service
	 */
	@GET
	@SigninNeeded
	@Path("{collocationId}/services/{serviceId}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getCollocationService(@Context SecurityContext security,
			@PathParam("collocationId") Long collocationId, @PathParam("serviceId") Long serviceId) {
		User user = ControllerUser.getUser(Long.parseLong(security.getUserPrincipal().getName()));
		if (ControllerCollocation.isCollocationMember(user, collocationId)) {
			Service service = ControllerService.getService(serviceId);
			if (service == null)
				Response.status(Status.NOT_ACCEPTABLE).build();
			return Response.status(Status.OK).entity(service).build();
		} else
			return Response.status(Status.UNAUTHORIZED).build();
	}

	/**
	 * Supprime le service d'id pass� en parametre
	 * @param security Contexte de securit�
	 * @param collocationId Id de la colocation
	 * @param serviceId Id du service
	 * @return Response
	 */
	@GET
	@SigninNeeded
	@Path("{collocationId}/services/{serviceId}/delete")
	@Produces(MediaType.APPLICATION_JSON)
	public Response deleteService(@Context SecurityContext security, @PathParam("collocationId") Long collocationId,
			@PathParam("serviceId") Long serviceId) {
		User user = ControllerUser.getUser(Long.parseLong(security.getUserPrincipal().getName()));
		if (ControllerCollocation.isCollocationMember(user, collocationId)) {
			Service s = ControllerService.getService(serviceId);
			if (s == null)
				return Response.status(Status.NOT_FOUND).build();
			Proposition p = ControllerProposition.createRemoveProposition(s, user);
			if (p == null)
				return Response.status(Status.CONFLICT).build();
			return Response.ok().build();
		} else
			return Response.status(Status.UNAUTHORIZED).build();
	}

	/**
	 * Recupere touts les propositions d'une colocation
	 * @param security Contexte de securit�
	 * @param collocationId Id de la colocation
	 * @return Liste de proposition
	 */
	@GET
	@SigninNeeded
	@Path("{collocationId}/propositions")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getCollocationPropositions(@Context SecurityContext security,
			@PathParam("collocationId") Long collocationId) {
		User user = ControllerUser.getUser(Long.parseLong(security.getUserPrincipal().getName()));
		if (ControllerCollocation.isCollocationMember(user, collocationId)) {
			return Response.status(Status.OK).entity(ControllerProposition.getCollocationPropositions(collocationId))
					.build();
		} else
			return Response.status(Status.UNAUTHORIZED).build();
	}

	/**
	 * Accepter la proposition d'id pass� en parametre
	 * @param security Contexte de securit�
	 * @param collocationId Id de la colocation
	 * @param propositionId Id de la proposition
	 * @return Response
	 */
	@GET
	@SigninNeeded
	@Path("{collocationId}/propositions/{propositionId}/accept")
	@Produces(MediaType.APPLICATION_JSON)
	public Response acceptProposition(@Context SecurityContext security, @PathParam("collocationId") Long collocationId,
			@PathParam("propositionId") Long propositionId) {
		User user = ControllerUser.getUser(Long.parseLong(security.getUserPrincipal().getName()));
		if (ControllerCollocation.isCollocationMember(user, collocationId)) {
			if (ControllerProposition.acceptProposition(propositionId, user)) {
				ControllerVote.checkVoteClosed(collocationId, propositionId);
				return Response.ok().build();
			} else
				return Response.status(Status.CONFLICT).build();
		} else
			return Response.status(Status.UNAUTHORIZED).build();
	}

	/**
	 * Accepter la proposition d'id pass� en parametre
	 * @param security Contexte de securit�
	 * @param collocationId Id de la colocation
	 * @param propositionId Id de la proposition
	 * @return Response
	 */
	@GET
	@SigninNeeded
	@Path("{collocationId}/propositions/{propositionId}/deny")
	@Produces(MediaType.APPLICATION_JSON)
	public Response denyProposition(@Context SecurityContext security, @PathParam("collocationId") Long collocationId,
			@PathParam("propositionId") Long propositionId) {
		User user = ControllerUser.getUser(Long.parseLong(security.getUserPrincipal().getName()));
		if (ControllerCollocation.isCollocationMember(user, collocationId)) {
			if (ControllerProposition.denyProposition(propositionId, user)) {
				ControllerVote.checkVoteClosed(collocationId, propositionId);
				return Response.ok().build();
			} else
				return Response.status(Status.CONFLICT).build();
		} else
			return Response.status(Status.UNAUTHORIZED).build();
	}

	/**
	 * Recupere tous les service achev�s d'une colocation
	 * @param security Contexte de securit�
	 * @param collocationId Id de la colocation
	 * @return Liste de service achev�s
	 */
	@GET
	@SigninNeeded
	@Path("{collocationId}/achieved_services")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getCollocationAchievedServices(@Context SecurityContext security,
			@PathParam("collocationId") Long collocationId) {
		User user = ControllerUser.getUser(Long.parseLong(security.getUserPrincipal().getName()));
		if (ControllerCollocation.isCollocationMember(user, collocationId)) {
			return Response.status(Status.OK)
					.entity(ControllerAchievedService.getAchievedServicesByCollocation(collocationId)).build();
		} else
			return Response.status(Status.UNAUTHORIZED).build();
	}

	/**
	 * Accepter une realisation de service dans une colocation
	 * @param security Contexte de securit�
	 * @param collocationId Id de la colocation
	 * @param achievedServiceId Id du service achev�
	 * @return Response
	 */
	@GET
	@SigninNeeded
	@Path("{collocationId}/achieved_services/{achievedServiceId}/accept")
	@Produces(MediaType.APPLICATION_JSON)
	public Response acceptAchievedService(@Context SecurityContext security,
			@PathParam("collocationId") Long collocationId, @PathParam("achievedServiceId") Long achievedServiceId) {
		User user = ControllerUser.getUser(Long.parseLong(security.getUserPrincipal().getName()));
		if (ControllerCollocation.isCollocationMember(user, collocationId)) {
			if (ControllerBeneficiary.acceptAchievedService(achievedServiceId, user))
				return Response.ok().build();
			else
				return Response.status(Status.CONFLICT).build();
		} else
			return Response.status(Status.UNAUTHORIZED).build();
	}

	/**
	 * Refuser une realisation de service dans une colocation
	 * @param security Contexte de securit�
	 * @param collocationId Id de la colocation
	 * @param achievedServiceId Id du service achev�
	 * @return Response
	 */
	@GET
	@SigninNeeded
	@Path("{collocationId}/achieved_services/{achievedServiceId}/deny")
	@Produces(MediaType.APPLICATION_JSON)
	public Response denyAchievedService(@Context SecurityContext security,
			@PathParam("collocationId") Long collocationId, @PathParam("achievedServiceId") Long achievedServiceId) {
		User user = ControllerUser.getUser(Long.parseLong(security.getUserPrincipal().getName()));
		if (ControllerCollocation.isCollocationMember(user, collocationId)) {
			if (ControllerBeneficiary.denyAchievedService(achievedServiceId, user))
				return Response.ok().build();
			else
				return Response.status(Status.CONFLICT).build();
		} else
			return Response.status(Status.UNAUTHORIZED).build();
	}

	/**
	 * Recupere tous les services achev�s d'un service dans une colocation
	 * @param security Contexte de securit�
	 * @param collocationId Id de la colocation
	 * @param serviceId Id du service
	 * @return Liste de service achev�
	 */
	@GET
	@SigninNeeded
	@Path("{collocationId}/services/{serviceId}/achieved_services")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getServiceAchievedServices(@Context SecurityContext security,
			@PathParam("collocationId") Long collocationId, @PathParam("serviceId") Long serviceId) {
		User user = ControllerUser.getUser(Long.parseLong(security.getUserPrincipal().getName()));
		if (ControllerCollocation.isCollocationMember(user, collocationId)) {
			return Response.status(Status.OK).entity(ControllerAchievedService.getAchievedServicesByService(serviceId))
					.build();
		} else
			return Response.status(Status.UNAUTHORIZED).build();
	}

	/**
	 * Cr�er un service achev� dans une colocation
	 * @param security Contexte de securit�
	 * @param collocationId Id de la colocation
	 * @param serviceId Id du service
	 * @param body Informations de creation du service achev�
	 * @return Service achev� nouvellement cr�e
	 */
	@POST
	@SigninNeeded
	@Path("{collocationId}/services/{serviceId}/achieved_services/create")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response createAchievedService(@Context SecurityContext security,
			@PathParam("collocationId") Long collocationId, @PathParam("serviceId") Long serviceId, JsonObject body) {
		User user = ControllerUser.getUser(Long.parseLong(security.getUserPrincipal().getName()));
		if (ControllerCollocation.isCollocationMember(user, collocationId)) {
			AchievedService as = ControllerAchievedService.createAchievedService(user, serviceId);
			if (as == null)
				return Response.status(Status.NOT_FOUND).build();
			as = ControllerBeneficiary.createAchievedServiceBeneficiaries(as, body.getJsonArray("beneficiariesIds"));
			return Response.status(Status.CREATED).entity(as).build();
		} else
			return Response.status(Status.UNAUTHORIZED).build();
	}

	/**
	 * Recupere tous les message d'une colocation
	 * @param security Contexte de securit�
	 * @param collocationId Id de la colocation
	 * @return Liste de message
	 */
	@GET
	@SigninNeeded
	@Path("{collocationId}/messages")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getCollocationMessages(@Context SecurityContext security,
			@PathParam("collocationId") Long collocationId) {
		User user = ControllerUser.getUser(Long.parseLong(security.getUserPrincipal().getName()));
		if (ControllerCollocation.isCollocationMember(user, collocationId)) {
			return Response.status(Status.OK).entity(ControllerMessage.getMessagesByCollocation(collocationId)).build();
		} else
			return Response.status(Status.UNAUTHORIZED).build();
	}

	/**
	 * Cr�er un message et l'envoi a une colocation
	 * @param security Contexte de securit�
	 * @param collocationId Id de la colocation
	 * @param message Informations de creation du message
	 * @return Message nouvellement cr�e
	 */
	@POST
	@SigninNeeded
	@Path("{collocationId}/messages/send")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response createMessage(@Context SecurityContext security, @PathParam("collocationId") Long collocationId,
			Message message) {
		User user = ControllerUser.getUser(Long.parseLong(security.getUserPrincipal().getName()));
		Message m = ControllerMessage.createMessage(message, collocationId, user);
		return Response.status(Status.CREATED).entity(m).build();
	}
}