package main.dao;

import java.util.List;

import javax.persistence.NoResultException;
import javax.persistence.TypedQuery;

import main.model.User;

public class DAOUser extends DAOAbstractFacade<User> {

	public DAOUser() {
		super(User.class);
	}
	public User getUser(Long userId) {
		TypedQuery<User> query = getEntityManager().createQuery("SELECT u FROM User u WHERE u.id = :userId", User.class)
				.setParameter("userId", userId);
		try {
			return query.getSingleResult();
		} catch (NoResultException e) {
			return null;
		}
	}

	public User login(String login, String password) {
		TypedQuery<User> query = getEntityManager()
				.createQuery("SELECT u FROM User u WHERE u.login = :login AND u.password = :password", User.class)
				.setParameter("login", login).setParameter("password", password);
		try {
			return query.getSingleResult();
		} catch (NoResultException e) {
			return null;
		}
	}

	public User getUserByLogin(String login) {
		TypedQuery<User> query = getEntityManager()
				.createQuery("SELECT u FROM User u WHERE u.login = :login", User.class).setParameter("login", login);
		try {
			return query.getSingleResult();
		} catch (NoResultException e) {
			return null;
		}
	}

	public List<User> getCollocationUsers(Long collocationId) {
		TypedQuery<User> query = getEntityManager()
				.createQuery("SELECT u FROM User u JOIN u.collocations c WHERE c.id = :collocationId", User.class)
				.setParameter("collocationId", collocationId);
		return query.getResultList();
	}
	
	public int getUserPoints(Long userId, Long collocationId) {
		TypedQuery<Long> query1 = getEntityManager().createQuery(
				"SELECT SUM(s.points) FROM User u JOIN u.collocations c JOIN c.services s JOIN s.achievedServices aService JOIN aService.author author "
				+ "WHERE u.id = :userId AND c.id = :collocationId AND aService.validated = :validated AND author.id = :authorId", Long.class)
				.setParameter("collocationId", collocationId)
				.setParameter("userId", userId)
				.setParameter("authorId", userId);
		int gainPoints = query1.getSingleResult() != null ? query1.getSingleResult().intValue() : 0;
		System.out.println(gainPoints);
		
		TypedQuery<Long> query2 = getEntityManager().createQuery(
				"SELECT SUM(s.points) * COUNT(aService.beneficiaries) FROM User u JOIN u.collocations c JOIN c.services s JOIN s.achievedServices aService JOIN aService.author author "
				+ "WHERE u.id = :userId AND c.id = :collocationId AND aService.validated = :validated AND author.id != :authorId", Long.class)
				.setParameter("collocationId", collocationId)
				.setParameter("userId", userId)
				.setParameter("authorId", userId);
		int lostPoints = query2.getSingleResult() != null ? query2.getSingleResult().intValue() : 0;
		System.out.println(gainPoints);
		return gainPoints - lostPoints;
	}
}
