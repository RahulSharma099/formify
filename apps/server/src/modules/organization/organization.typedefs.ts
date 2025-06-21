import { nexus } from "@formify/persistence";
import { enumType, objectType } from "nexus";

const NexusOrganization = nexus.Organization;
const NexusOrganizationUser = nexus.OrganizationUser;
const NexusOrganizationRole = nexus.OrganizationRole;
const NexusOrganizationStatus = nexus.OrganizationUserStatus;

const OrganizationRole = enumType(NexusOrganizationRole);
const OrganizationStatus = enumType(NexusOrganizationStatus);

const OrganizationUser = objectType({
  name: NexusOrganizationUser.$name,
  description: NexusOrganizationUser.$description,
  definition(t) {
    t.nonNull.field(NexusOrganizationUser.createdAt);
    t.nonNull.field(NexusOrganizationUser.id);
    t.nonNull.field(NexusOrganizationUser.organization);
    t.nonNull.field(NexusOrganizationUser.organizationId);
    t.nonNull.field(NexusOrganizationUser.role);
    t.nonNull.field(NexusOrganizationUser.status);
    t.nonNull.field(NexusOrganizationUser.updatedAt);
    t.nonNull.field(NexusOrganizationUser.user);
    t.nonNull.field(NexusOrganizationUser.userId);
  },
});

const Organization = objectType({
  name: NexusOrganization.$name,
  description: NexusOrganization.$description,
  definition(t) {
    t.nonNull.field(NexusOrganization.createdAt);
    t.nonNull.field(NexusOrganization.id);
    t.nonNull.field(NexusOrganization.name);
    // t.nonNull.field(NexusOrganization.projects);
    t.nonNull.field(NexusOrganization.updatedAt);
    t.nonNull.field(NexusOrganization.users);
  },
});

const schema = [
  Organization,
  OrganizationUser,
  OrganizationRole,
  OrganizationStatus,
];

export default schema;
