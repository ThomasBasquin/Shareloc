package main.dao;

import main.model.Service;

import javax.persistence.TypedQuery;
import java.util.List;

public class DAOService extends DAOAbstractFacade<Service> {

	public DAOService() {
		super(Service.class);
	}

	public List<Service> getCollocationApprovedServices(Long collocationId) {
		TypedQuery<Service> query = getEntityManager().createQuery(
				"SELECT s FROM Service s JOIN s.collocation c WHERE s.approved = :approved AND c.id = :collocationId",
				Service.class).setParameter("approved", true).setParameter("collocationId", collocationId);
		return query.getResultList();
	}
}
