package main.dao;

import main.model.AchievedService;

import javax.persistence.TypedQuery;
import java.util.List;

public class DAOAchievedService extends DAOAbstractFacade<AchievedService> {

	public DAOAchievedService() {
		super(AchievedService.class);
	}

	public List<AchievedService> findAllByService(Long serviceId) {
		TypedQuery<AchievedService> query = getEntityManager().createQuery(
				"SELECT achievedS FROM AchievedService achievedS JOIN achievedS.service s WHERE s.id = :serviceId",
				AchievedService.class).setParameter("serviceId", serviceId);
		return query.getResultList();
	}

	public List<AchievedService> findAllByCollocation(Long collocationId) {
		TypedQuery<AchievedService> query = getEntityManager()
				.createQuery(
						"SELECT achievedS FROM AchievedService achievedS "
								+ "JOIN achievedS.service s JOIN s.collocation c " + "WHERE c.id = :collocationId",
						AchievedService.class)
				.setParameter("collocationId", collocationId);
		return query.getResultList();
	}
}

