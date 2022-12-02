package main.controller;

import main.dao.DAOCollocation;
import main.model.Collocation;
import main.model.User;

import java.util.List;

public class ControllerCollocation {

	static private DAOCollocation DAOCollocation = new DAOCollocation();;

	public static List<Collocation> getCollocations() {
		return DAOCollocation.findAll();
	}

	public static Collocation getCollocation(Long id) {
		return DAOCollocation.find(id);
	}

	public static Collocation update(Collocation collocation) {
		try {
			return DAOCollocation.update(collocation);
		} catch (Exception e) {
			return null;
		}
	}

	public static void delete(Collocation collocation) {
		DAOCollocation.delete(collocation);
	}

	public static List<Collocation> getUserCollocations(Long userId) {
		return DAOCollocation.getUserCollocations(userId);
	}

	public static Collocation createCollocation(Collocation collocation) {
		return DAOCollocation.create(collocation);
	}

	public static boolean isCollocationManager(User user, Long collocationId) {
		int count = DAOCollocation.isUserCollocationManager(user.getId(), collocationId);
		return (count >= 1) ? true : false;
	}

	public static boolean isCollocationMember(User user, Long collocationId) {
		int count = DAOCollocation.isUserCollocationMember(user.getId(), collocationId);
		return (count >= 1) ? true : false;
	}
}
