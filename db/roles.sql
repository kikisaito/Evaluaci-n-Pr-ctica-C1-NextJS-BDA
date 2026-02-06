
DO $$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'app_user') THEN
        CREATE ROLE app_user WITH LOGIN PASSWORD 'cafeteria_pass_2024';
    END IF;
END $$;


GRANT USAGE ON SCHEMA public TO app_user;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO app_user;


REVOKE ALL ON ALL TABLES IN SCHEMA public FROM app_user;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO app_user;