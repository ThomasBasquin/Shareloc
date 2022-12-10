package main.controller;

import main.dao.DAOService;
import main.model.Collocation;
import main.model.Service;

import java.util.List;



public class ControllerService {

	static private DAOService DAOService = new DAOService();

	public static Service update(Service service) {
		try {
			return DAOService.update(service);
		} catch (Exception e) {
			return null;
		}
	}

	public static void delete(Service service) {
		DAOService.delete(service);
	}

	public static List<Service> getCollocationApprovedServices(Long collocationId) {
		return DAOService.getCollocationApprovedServices(collocationId);
	}

	public static Service getService(Long id) {
		return DAOService.find(id);
	}

	public static Service createService(Service service, Long collocationId) {
		Collocation collocation = ControllerCollocation.getCollocation(collocationId);
		return DAOService.create(service);
	}
}
