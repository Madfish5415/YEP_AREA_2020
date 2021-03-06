import { Router } from "express";

import { ABOUT_ROUTE } from "../constants";

export const aboutRouter = Router();

aboutRouter.get(ABOUT_ROUTE, async (req, res) => {
  const services = await req.serviceRepository.list();

  const filteredServices = services.filter((service) => {
    return (
      service.nodes.find((node) => node.label === "action") ||
      service.nodes.find((node) => node.label === "reaction")
    );
  });

  const aboutServices = filteredServices.map((service) => {
    const actions = service.nodes.filter((node) => node.label === "action");
    const reactions = service.nodes.filter((node) => node.label === "reaction");

    return {
      name: service.id,
      actions: actions.map((action) => {
        return {
          name: action.id,
          description: action.description,
        };
      }),
      reactions: reactions.map((reaction) => {
        return {
          name: reaction.id,
          description: reaction.description,
        };
      }),
    };
  });

  const client = {
    host: req.get("x-real-ip") || req.ip,
  };
  const server = {
    current_time: Math.ceil(Date.now() / 1000),
    services: aboutServices,
  };

  const about = {
    client: client,
    server: server,
  };

  return res.json(about);
});
