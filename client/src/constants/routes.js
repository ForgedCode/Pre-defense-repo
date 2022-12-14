const routes = {
	HOME: "/",
	LOGIN: "/login",
	REGISTER: "/registration",
	MYCOLLS: "/personalCollections",
	ADMIN: "/admin",
	CREATE_COLLECTION: "/createCollection",
	COLLECTION: "/collection/:id",
	EDIT_COLLECTION: "/collection/:id/edit",
	CREATE_ITEM: "/collection/:id/createItem",
	EDIT_ITEM: "/collection/editItem/:id",
	ITEM: "/collection/item/:id",
	TAG_RESULTS: "/tagResults",
	SEARCH_RESULTS: "/searchResults",
};

export default routes;
