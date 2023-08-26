\connect -reuse-previous=on "dbname='API-CRUD'"

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: Role; Type: TYPE; Schema: public; Owner: user
--

CREATE TYPE public."Role" AS ENUM (
    'USER',
    'ADMIN'
);


ALTER TYPE public."Role" OWNER TO "user";

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Pokemon; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public."Pokemon" (
    id text NOT NULL,
    "userId" text NOT NULL,
    "nickName" text NOT NULL,
    name text NOT NULL,
    "order" integer NOT NULL,
    image text NOT NULL
);


ALTER TABLE public."Pokemon" OWNER TO "user";

--
-- Name: PokemonType; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public."PokemonType" (
    id text NOT NULL,
    "pokemonId" text NOT NULL,
    name text NOT NULL
);


ALTER TABLE public."PokemonType" OWNER TO "user";

--
-- Name: User; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public."User" (
    id text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    name text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    roles public."Role"[] DEFAULT ARRAY['USER'::public."Role"]
);


ALTER TABLE public."User" OWNER TO "user";

--
-- Data for Name: Pokemon; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public."Pokemon" (id, "userId", "nickName", name, "order", image) FROM stdin;
b957ebba-b964-4931-adda-14e1640a130f	ce618c8e-f079-44cb-ae26-82f7d1cbd753	Bulbazinho	bulbasaur	1	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png
0885e20e-ab72-4f3b-a9e4-ad2753119a7c	ce618c8e-f079-44cb-ae26-82f7d1cbd753	Bulba	ivysaur	2	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png
157f0d0d-241c-4c95-8f73-ce01e6f838cd	ce618c8e-f079-44cb-ae26-82f7d1cbd753	Teste	blastoise	9	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/9.png
137bacdd-a101-484c-94ff-d17c86549bba	e8911fc0-bf8f-47b5-b7b9-89c3c1524fe6	Muricola	dewgong	87	https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/87.png
\.


--
-- Data for Name: PokemonType; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public."PokemonType" (id, "pokemonId", name) FROM stdin;
590e1a09-1376-4a1f-8e27-0c79deb11214	b957ebba-b964-4931-adda-14e1640a130f	grass
8184f7c1-555b-45dd-93aa-2c7ecf9cffa1	b957ebba-b964-4931-adda-14e1640a130f	poison
05b92ad4-4257-427f-b1b7-c0661f8f4423	0885e20e-ab72-4f3b-a9e4-ad2753119a7c	grass
7de196e5-ecc6-471b-af9b-7ea0bdad6881	0885e20e-ab72-4f3b-a9e4-ad2753119a7c	poison
5a218b04-71b8-4707-8cdc-049ffaceec45	157f0d0d-241c-4c95-8f73-ce01e6f838cd	water
0e871105-1b4b-4388-8dfa-858b15fea347	137bacdd-a101-484c-94ff-d17c86549bba	water
504545d6-495f-4489-b16f-eb93d5f4915c	137bacdd-a101-484c-94ff-d17c86549bba	ice
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public."User" (id, email, password, name, "createdAt", "updatedAt", roles) FROM stdin;
ce618c8e-f079-44cb-ae26-82f7d1cbd753	teste2@gmail.com	$2b$08$cPbUT2d2ppxU8TWjPYBHZ.r29lnjtaC/PVxZpdCdA1eKfDyfIHA7m	Lucas	2023-08-26 03:18:23.154	2023-08-26 03:19:31.827	{USER,ADMIN}
e8911fc0-bf8f-47b5-b7b9-89c3c1524fe6	murilo@gmail.com	$2b$08$ILRucrbk1gLFh8jEmjqZ1eSIuqMaLeS6Xs.lay8zg19Leiperm96O	Murilo	2023-08-26 10:24:57.812	2023-08-26 10:25:46.847	{USER,ADMIN}
\.


--
-- Name: PokemonType PokemonType_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public."PokemonType"
    ADD CONSTRAINT "PokemonType_pkey" PRIMARY KEY (id);


--
-- Name: Pokemon Pokemon_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public."Pokemon"
    ADD CONSTRAINT "Pokemon_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: user
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: PokemonType PokemonType_pokemonId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public."PokemonType"
    ADD CONSTRAINT "PokemonType_pokemonId_fkey" FOREIGN KEY ("pokemonId") REFERENCES public."Pokemon"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--