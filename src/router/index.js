import { createRouter, createWebHistory } from "vue-router";

// Import Views
import HomeView from "../views/HomeView.vue";
import MovieView from "../views/MovieView.vue";
import MovieDetailView from "../views/MovieDetailView.vue";
import MovieReviewView from "../views/MovieReviewView.vue";
import GenreView from "../views/GenreView.vue";
import GenreDetailView from "../views/GenreDetailView.vue";
import CastView from "../views/CastView.vue";
import CastDetailView from "../views/CastDetailView.vue";
import LoginView from "../views/auth/LoginView.vue";
import RegisterView from "../views/auth/RegisterView.vue";
import OTPView from "../views/auth/OTPView.vue";
import ProfileView from "../views/ProfileView.vue";
import DashboardView from "../views/DashboardView.vue";

// Import Admin Views
import MovieCrud from "../views/admin/movie/MovieCrud.vue";
import MovieAdd from "../views/admin/movie/MovieAdd.vue";
import MovieEdit from "../views/admin/movie/MovieEdit.vue";
import MovieCastSelection from "../views/admin/movie/MovieCastSelection.vue";
import CastCrud from "../views/admin/cast/CastCrud.vue";
import CastAdd from "../views/admin/cast/CastAdd.vue";
import CastEdit from "../views/admin/cast/CastEdit.vue";
// import CastMovieEdit from '../views/admin/castMovie/CastMovieEdit.vue';

// Authentication Guard
const requireAuth = (to, from, next) => {
  const token = localStorage.getItem("token");
  token ? next() : next("/login");
};

// Routes Configuration
const routes = [
  { path: "/", name: "Home", component: HomeView },
  { path: "/movies", name: "Movie", component: MovieView },
  { path: "/movies/:id", name: "MovieDetail", component: MovieDetailView },
  {
    path: "/movies/:id/review",
    name: "MovieReview",
    component: MovieReviewView, // Komponen untuk halaman review movie
  },
  { path: "/genres", name: "Genre", component: GenreView },
  { path: "/genres/:id", name: "GenreDetail", component: GenreDetailView },
  { path: "/casts", name: "Cast", component: CastView },
  { path: "/casts/:id", name: "CastDetail", component: CastDetailView },

  // Admin Routes
  {
    path: "/admin/movies",
    name: "AdminMovies",
    component: MovieCrud,
    meta: { layout: "admin" },
  },
  {
    path: "/admin/movies/add-movie",
    name: "MovieAdd",
    component: MovieAdd,
    meta: { layout: "admin" },
  },
  {
    path: "/admin/movies/edit/:id",
    name: "MovieEdit",
    component: MovieEdit,
    props: true,
    meta: { layout: "admin" },
  },
  {
    path: "/admin/movies/:movieId/add-cast",
    name: "MovieCastSelection",
    component: MovieCastSelection,
    meta: { layout: "admin" },
  },
  {
    path: "/admin/casts",
    name: "AdminCasts",
    component: CastCrud,
    meta: { layout: "admin" },
  },
  {
    path: "/admin/casts/add-cast",
    name: "CastAdd",
    component: CastAdd,
    meta: { layout: "admin" },
  },
  {
    path: "/admin/casts/edit/:id",
    name: "CastEdit",
    component: CastEdit,
    meta: { layout: "admin" },
  },
  {
    path: "/admin/genres",
    name: "GenreCrud",
    component: () => import("../views/admin/genre/GenreCrud.vue"),
    meta: { layout: "admin" },
  },
  {
    path: "/admin/genres/add",
    name: "GenreAdd",
    component: () => import("../views/admin/genre/GenreAdd.vue"),
    meta: { layout: "admin" },
  },
  {
    path: "/admin/genres/edit/:id",
    name: "GenreEdit",
    component: () => import("../views/admin/genre/GenreEdit.vue"),
    meta: { layout: "admin" },
  },

  // {
  //   path: "/admin/cast-movies/add-cast",
  //   name: "CastAddMovie",
  //   component: CastMovieEdit,
  //   meta: { layout: 'admin' }
  // },

  // Auth Routes
  {
    path: "/login",
    name: "Login",
    component: LoginView,
    meta: { layout: "auth", requiresGuest: true },
  },
  {
    path: "/register",
    name: "Register",
    component: RegisterView,
    meta: { layout: "auth", requiresGuest: true },
  },
  {
    path: "/otp",
    name: "OTP",
    component: OTPView,
    beforeEnter: requireAuth,
    meta: { layout: "auth" },
  },
  {
    path: "/profile",
    name: "Profile",
    component: ProfileView,
    beforeEnter: requireAuth,
    meta: { requiresAuth: true, requiresVerified: true },
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: DashboardView,
    beforeEnter: requireAuth,
    meta: { requiresAuth: true, requiresAdmin: true, layout: "admin" },
  },
];

// Router Setup
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// Navigation Guard
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  const userString = localStorage.getItem("user");
  let user = null;

  if (userString) {
    try {
      user = JSON.parse(userString);
    } catch (error) {
      console.error("Error parsing user data:", error);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      next("/login");
      return;
    }
  }

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!token) {
      next({ name: "Login" });
    } else if (
      to.matched.some((record) => record.meta.requiresVerified) &&
      (!user || !user.email_verified_at)
    ) {
      next({ name: "OTP" });
    } else if (
      to.matched.some((record) => record.meta.requiresAdmin) &&
      (!user || user.role.name !== "admin")
    ) {
      next({ name: "Home" });
    } else {
      next();
    }
  } else if (to.matched.some((record) => record.meta.requiresGuest)) {
    token ? next({ name: "Home" }) : next();
  } else {
    next();
  }
});

export default router;
