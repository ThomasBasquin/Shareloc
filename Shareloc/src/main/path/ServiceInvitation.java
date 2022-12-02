package main.path;

import main.controller.ControllerUser;
import main.model.User;
import main.security.SigninNeeded;

import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;
import javax.ws.rs.core.Response.Status;

@SigninNeeded
@Path("/invitations")
public class ServiceInvitation {

	/**
	 * Renvoie les invitations en cours de l'utilisateur
	 * @param security Contexte de securit�
	 * @return Les invitations en cours
	 */
	@GET
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	public List<Invitation> getUserPendingInvitations(@Context SecurityContext security) {
		User user = ControllerUser.getUser(Long.parseLong(security.getUserPrincipal().getName()));
		return ControllerInvitation.getUserPendingInvitations(user);
	}

	/**
	 * Accepte l'invitation d'id pass� en parametre
	 * @param security Contexte de securit�
	 * @param id Id de l'invitation a accepter
	 * @return Response
	 */
	@GET
	@Path("/{id}/accept")
	@Produces(MediaType.APPLICATION_JSON)
	public Response acceptInvitation(@Context SecurityContext security, @PathParam("id") Long id) {
		User user = ControllerUser.getUser(Long.parseLong(security.getUserPrincipal().getName()));
		if (ControllerInvitation.acceptInvitation(id, user))
			return Response.ok().build();
		else
			return Response.status(Status.INTERNAL_SERVER_ERROR).build();
	}

	/**
	 * Refuse l'invitation d'id pass� en parametre
	 * @param security Contexte de securit�
	 * @param id Id de l'invitation a accepter
	 * @return Response
	 */
	@GET
	@Path("/{id}/deny")
	@Produces(MediaType.APPLICATION_JSON)
	public Response denyInvitation(@Context SecurityContext security, @PathParam("id") Long id) {
		User user = ControllerUser.getUser(Long.parseLong(security.getUserPrincipal().getName()));
		if (ControllerInvitation.denyInvitation(id, user))
			return Response.ok().build();
		else
			return Response.status(Status.INTERNAL_SERVER_ERROR).build();
	}
}