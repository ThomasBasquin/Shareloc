package main.security;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerResponseContext;
import javax.ws.rs.container.ContainerResponseFilter;

public class JWTResponseFilter implements ContainerResponseFilter {

    @Override
    public void filter(ContainerRequestContext requestContext, ContainerResponseContext responseContext) throws IOException {
    	// si l'authentification a réussi, on recopie le JWT dans la réponse
        if (requestContext.getProperty("auth-failed") != null) {
            Boolean failed = (Boolean) requestContext.getProperty("auth-failed");
            if (failed) {
                return;
            }
        }

        List<Object> jwt = new ArrayList<Object>();
        jwt.add(JWTokenUtility.buildJWT(requestContext.getSecurityContext().getUserPrincipal().getName()));
        jwt.add(requestContext.getHeaderString("Authorization").split(" ")[1]);
        responseContext.getHeaders().put("jwt", jwt);
    }
}