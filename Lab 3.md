Get IP and Mac:
docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}} {{.MacAddress}}{{end}}' *DOCKERCONTAINERVALUE*
