package main.security;

import org.jose4j.jwk.RsaJsonWebKey;
import org.jose4j.jwk.RsaJwkGenerator;
import org.jose4j.lang.JoseException;

import java.util.logging.Level;
import java.util.logging.Logger;

/**
 * Classe permettant la génération d'une clé RSA sur 2048 bits
 */
public class RsaKeyProducer {

	// clé RSA
	private static RsaJsonWebKey theOne;

	/**
	 * Méthode produisant une nouvelle clé si elle n'existe pas encore
	 * 
	 * @return la clé générée
	 */
	public static RsaJsonWebKey produce() {
		if (theOne == null) {
			try {
				theOne = RsaJwkGenerator.generateJwk(2048);
			} catch (JoseException ex) {
				Logger.getLogger(RsaKeyProducer.class.getName()).log(Level.SEVERE, null, ex);
			}
		}

		System.out.println("RSA Key setup... " + theOne);
		return theOne;
	}
}