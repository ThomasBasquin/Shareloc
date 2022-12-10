package main.dao;

import main.model.Collocation;

import javax.persistence.TypedQuery;
import java.util.List;

public class DAOCollocation extends DAOAbstractFacade<Collocation> {

	public DAOCollocation() {
		super(Collocation.class);
	}

	public List<Collocation> getUserCollocations(Long userId) {
		TypedQuery<Collocation> query = getEntityManager()
				.createQuery("SELECT c FROM Collocation c JOIN c.members m WHERE m.id = :userId", Collocation.class)
				.setParameter("userId", userId);
		return query.getResultList();
	}

	public int isUserCollocationManager(Long userId, Long collocationId) {
		TypedQuery<Long> query = getEntityManager().createQuery(
				"SELECT COUNT(c) FROM Collocation c JOIN c.manager u WHERE c.id = :collocationId AND u.id = :userId",
				Long.class).setParameter("collocationId", collocationId).setParameter("userId", userId);
		return query.getSingleResult().intValue();
	}

	public int isUserCollocationMember(Long userId, Long collocationId) {
		TypedQuery<Long> query = getEntityManager().createQuery(
				"SELECT COUNT(c) FROM Collocation c JOIN c.members m WHERE c.id = :collocationId AND m.id = :userId",
				Long.class).setParameter("collocationId", collocationId).setParameter("userId", userId);
		return query.getSingleResult().intValue();
	}
}
