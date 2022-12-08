package main.dao;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.NoResultException;
import javax.persistence.Persistence;
import javax.persistence.Query;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

public abstract class DAOAbstractFacade<T> {
	private Class<T> entityClass;
	private EntityManagerFactory emFactory = Persistence.createEntityManagerFactory("DataBase");;
	private EntityManager em = null;

	public DAOAbstractFacade(Class<T> entityClass) {
		this.entityClass = entityClass;
	}

	public EntityManager getEntityManager() {
		if (em == null)
			em = emFactory.createEntityManager();
		return em;
	}

	public T create(T entity) {
		if (!getEntityManager().getTransaction().isActive())
			getEntityManager().getTransaction().begin();
		getEntityManager().persist(entity);
		getEntityManager().flush();
		getEntityManager().getTransaction().commit();
		return entity;
	}

	public T update(T entity) {
		if (!getEntityManager().getTransaction().isActive())
			getEntityManager().getTransaction().begin();
		getEntityManager().merge(entity);
		getEntityManager().getTransaction().commit();
		return entity;
	}

	public void delete(T entity) {
		if (!getEntityManager().getTransaction().isActive())
			getEntityManager().getTransaction().begin();
		getEntityManager().remove(getEntityManager().merge(entity));
		getEntityManager().getTransaction().commit();
	}

	public T find(Object id) {
		return getEntityManager().find(entityClass, id);
	}

	public List<T> findAll() {
		CriteriaQuery<T> cq = getEntityManager().getCriteriaBuilder().createQuery(entityClass);
		cq.select(cq.from(entityClass));
		return getEntityManager().createQuery(cq).getResultList();
	}

	public int count() {
		CriteriaQuery<Long> cq = getEntityManager().getCriteriaBuilder().createQuery(Long.class);
		Root<T> rt = cq.from(entityClass);
		cq.select(getEntityManager().getCriteriaBuilder().count(rt));
		Query q = getEntityManager().createQuery(cq);
		return ((Long) q.getSingleResult()).intValue();
	}

	public T findOneBy(Map<String, Object> params) {
		CriteriaBuilder cb = getEntityManager().getCriteriaBuilder();
		CriteriaQuery<T> cq = cb.createQuery(entityClass);
		Root<T> rt = cq.from(entityClass);
		cq.select(rt);
		List<Predicate> predicates = new ArrayList<>();
		for (Map.Entry<String, Object> entry : params.entrySet()) {
			predicates.add(cb.equal(rt.get(entry.getKey()), entry.getValue()));
		}
		cq.where(cb.and(predicates.toArray(new Predicate[] {})));
		TypedQuery<T> query = getEntityManager().createQuery(cq);
		T entity;
		try {
			entity = query.getSingleResult();
		} catch (NoResultException e) {
			entity = null;
		}
		return entity;
	}

	public List<T> findBy(Map<String, Object> params) {
		CriteriaBuilder cb = getEntityManager().getCriteriaBuilder();
		CriteriaQuery<T> cq = cb.createQuery(entityClass);
		Root<T> rt = cq.from(entityClass);
		cq.select(rt);
		List<Predicate> predicates = new ArrayList<>();
		for (Map.Entry<String, Object> entry : params.entrySet()) {
			predicates.add(cb.equal(rt.get(entry.getKey()), entry.getValue()));
		}
		cq.where(cb.and(predicates.toArray(new Predicate[] {})));
		return getEntityManager().createQuery(cq).getResultList();
	}
}
