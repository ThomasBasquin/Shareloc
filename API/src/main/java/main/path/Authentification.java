package main.path;

import main.controller.ControllerUser;
import main.model.User;
import main.security.JWTokenUtility;
import main.security.SigninNeeded;

import javax.json.JsonObject;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;
import javax.ws.rs.core.SecurityContext;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Path("/")
public class Authentification {

	/**
	 * Renvoie la liste de tous les utilisateurs
	 * @return Liste d'utilisateurs
	 */
	@GET
	@Path("/users")
	@Produces(MediaType.APPLICATION_JSON)
	public List<User> getUsers() {
		return ControllerUser.getUsers();
	}

	/**
	 * Renvoie l'utilisateur qui a l'id saisi en param�tre
	 * @param userId Id de l'utilisateur
	 * @return Utilisateur
	 */
	@GET
	@Path("/users/{userId}")
	@Produces(MediaType.APPLICATION_JSON)
	public User getUser(@PathParam("userId") Long userId) {
		return ControllerUser.getUser(userId);
	}

	/**
	 * Renvoie le profil de l'utilisateur du token pass�
	 * @param security Contexte de securit�
	 * @return Utilisateur connect�
	 */
	@GET
	@SigninNeeded
	@Path("/profile")
	@Produces(MediaType.APPLICATION_JSON)
	public Response whoami(@Context SecurityContext security) {
		User user = ControllerUser.getUser(Long.parseLong(security.getUserPrincipal().getName()));
		if (user == null)
			return Response.status(Status.NO_CONTENT).build();
		return Response.ok().entity(user).build();
	}

	/**
	 * Met a jour le profil de l'utilisateur connect� avec les informations du body
	 * @param security Contexte de securit�
	 * @param modifications Modifications sous forme d'une entit� User
	 * @return L'utilisateur modifi�
	 */
	@PUT
	@SigninNeeded
	@Path("/profile/update")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response updateProfile(@Context SecurityContext security, User modifications) {
		User currentUser = ControllerUser.getUser(Long.parseLong(security.getUserPrincipal().getName()));
		User modifiedUser = ControllerUser.updateUserProfile(currentUser, modifications);
		if (modifiedUser == null)
			return Response.status(Status.INTERNAL_SERVER_ERROR).build();
		return Response.ok().entity(modifiedUser).build();
	}

	/**
	 * Connecte l'utilisateur et lui renvoi un token qui lui permettra de s'authentifier sur d'autres routes
	 * @param body Body de la requete sous la forme : { "login": "", "password": "" }
	 * @return Le token de cet utilisateur
	 */
	@POST
	@Path("/signin")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response signin(JsonObject body) {
		User u = ControllerUser.login(body.getString("login"), body.getString("password"));
		if (u == null)
			return Response.status(Status.NOT_ACCEPTABLE).build();
		Map<String, String> response = new HashMap<String, String>();
		response.put("token", JWTokenUtility.buildJWT(u.getId().toString()));
		return Response.ok().entity(response).build();
	}

	/**
	 * Inscrit l'utilisateur pass� dans le body
	 * @param user Information de l'utilisateur a inscrire
	 * @return L'utilisateur qui viens de s'inscrire
	 */
	@POST
	@Path("/signup")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response signup(User user) {
		User createdUser = ControllerUser.create(user);
		if (createdUser == null)
			return Response.status(Status.CONFLICT).build();
		return Response.status(Status.CREATED).entity(createdUser).build();
	}

	/**
	 * M�thode permettant de r�cup�rer l'ensemble des roles d'un utilisateur
	 * 
	 * @param user l'utilisateur
	 * @return une liste de tous les roles associ�s � l'utilisateur user
	 */
	public static List<String> findUserRoles(String user) {
		return null;
	}
}
