package main.controller;

import java.util.List;

import main.dao.DAOAchievedService;
import main.model.AchievedService;
import main.model.Collocation;
import main.model.Service;
import main.model.User;

public class ControllerAchievedService {

	static private DAOAchievedService DAOAchievedService = new DAOAchievedService();

	public static AchievedService getAchievedServiceById(Long id) {
		return DAOAchievedService.find(id);
	}

	public static AchievedService update(AchievedService achievedService) {
		try {
			return DAOAchievedService.update(achievedService);
		} catch (Exception e) {
			return null;
		}
	}

	public static List<AchievedService> getAchievedServicesByService(Long serviceId) {
		Service service = ControllerService.getService(serviceId);
		if (service == null)
			return null;
		return DAOAchievedService.findAllByService(serviceId);
	}

	public static List<AchievedService> getAchievedServicesByCollocation(Long collocationId) {
		Collocation collocation = ControllerCollocation.getCollocation(collocationId);
		if (collocation == null)
			return null;
		return DAOAchievedService.findAllByCollocation(collocationId);
	}

	public static AchievedService createAchievedService(User author, Long serviceId) {
		Service service = ControllerService.getService(serviceId);
		if (service == null)
			return null;
		return DAOAchievedService.create(new AchievedService(author, null, service));
	}
}