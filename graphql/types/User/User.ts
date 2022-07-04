import { enumType, objectType } from "nexus";
import {
  Account,
  Role,
  Session,
  User,
  VerificationToken,
} from "../../generated/nexusTypes";

export const RoleEnum = enumType(Role);

export const UserType = objectType({
  name: User.$name,
  definition: (t) => {
    t.field(User.id);
    t.field(User.role);
    t.field(User.name);
    t.field(User.email);
    t.field(User.emailVerified);
    t.field(User.image);
    t.field(User.accounts);
    t.field(User.sessions);
    t.field(User.ratings);
  },
});

export const SessionType = objectType({
  name: Session.$name,
  definition: (t) => {
    t.field(Session.id);
    t.field(Session.sessionToken);
    t.field(Session.userId);
    t.field(Session.expires);
    t.field(Session.user);
  },
});

export const AccountType = objectType({
  name: Account.$name,
  definition: (t) => {
    t.field(Account.id);
    t.field(Account.userId);
    t.field(Account.type);
    t.field(Account.provider);
    t.field(Account.providerAccountId);
    t.field(Account.refresh_token);
    t.field(Account.access_token);
    t.field(Account.expires_at);
    t.field(Account.token_type);
    t.field(Account.scope);
    t.field(Account.id_token);
    t.field(Account.session_state);
    t.field(Account.oauth_token);
    t.field(Account.oauth_token_secret);
  },
});

export const VerificationTokenType = objectType({
  name: VerificationToken.$name,
  definition: (t) => {
    t.field(VerificationToken.identifier);
    t.field(VerificationToken.token);
    t.field(VerificationToken.expires);
  },
});
