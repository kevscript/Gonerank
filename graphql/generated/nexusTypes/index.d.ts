import * as NexusCore from 'nexus/dist/core'

//
//
// TYPES
// TYPES
// TYPES
// TYPES
//
//

// Models

/**
  * Generated Nexus `objectType` configuration based on your Prisma schema's model `Account`.
  *
  * ### ️⚠️ You have not writen documentation for model Account
  *
  * Replace this default advisory JSDoc with your own documentation about model Account
  * by documenting it in your Prisma schema. For example:
  *
  * ```prisma
  * /// Lorem ipsum dolor sit amet...
  * model Account {
  *   foo  String
  * }
  * ```
  *
  * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
  *
  * @example
  *
  * import { objectType } from 'nexus'
  * import { Account } from 'nexus-prisma'
  *
  * objectType({
  *   name: Account.$name
  *   description: Account.$description
  *   definition(t) {
  *     t.field(Account.id)
  *   }
  * })
  */
export interface Account {
  $name: 'Account'
  $description: undefined
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `Account.id`.
    *
    * ### ️⚠️ You have not writen documentation for model Account
    *
    * Replace this default advisory JSDoc with your own documentation about model Account
    * by documenting it in your Prisma schema. For example:
    * ```prisma
    * model Account {
    *   /// Lorem ipsum dolor sit amet.
    *   id  String
    * }
    * ```
    *
    * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { Account } from 'nexus-prisma'
    *
    * objectType({
    *   name: Account.$name
    *   description: Account.$description
    *   definition(t) {
    *     t.field(Account.id)
    *   }
    * })
    */
  id: {
    /**
     * The name of this field.
     */
    name: 'id'
  
    /**
     * The type of this field.
     */
    type: 'ID' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNonNullDef<'ID'>
    : 'Warning/Error: The type \'ID\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'ID\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: undefined
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'Account', 'id'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `Account.userId`.
    *
    * ### ️⚠️ You have not writen documentation for model Account
    *
    * Replace this default advisory JSDoc with your own documentation about model Account
    * by documenting it in your Prisma schema. For example:
    * ```prisma
    * model Account {
    *   /// Lorem ipsum dolor sit amet.
    *   userId  String
    * }
    * ```
    *
    * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { Account } from 'nexus-prisma'
    *
    * objectType({
    *   name: Account.$name
    *   description: Account.$description
    *   definition(t) {
    *     t.field(Account.userId)
    *   }
    * })
    */
  userId: {
    /**
     * The name of this field.
     */
    name: 'userId'
  
    /**
     * The type of this field.
     */
    type: 'String' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNonNullDef<'String'>
    : 'Warning/Error: The type \'String\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'String\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: undefined
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'Account', 'userId'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `Account.type`.
    *
    * ### ️⚠️ You have not writen documentation for model Account
    *
    * Replace this default advisory JSDoc with your own documentation about model Account
    * by documenting it in your Prisma schema. For example:
    * ```prisma
    * model Account {
    *   /// Lorem ipsum dolor sit amet.
    *   type  String
    * }
    * ```
    *
    * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { Account } from 'nexus-prisma'
    *
    * objectType({
    *   name: Account.$name
    *   description: Account.$description
    *   definition(t) {
    *     t.field(Account.type)
    *   }
    * })
    */
  type: {
    /**
     * The name of this field.
     */
    name: 'type'
  
    /**
     * The type of this field.
     */
    type: 'String' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNonNullDef<'String'>
    : 'Warning/Error: The type \'String\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'String\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: undefined
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'Account', 'type'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `Account.provider`.
    *
    * ### ️⚠️ You have not writen documentation for model Account
    *
    * Replace this default advisory JSDoc with your own documentation about model Account
    * by documenting it in your Prisma schema. For example:
    * ```prisma
    * model Account {
    *   /// Lorem ipsum dolor sit amet.
    *   provider  String
    * }
    * ```
    *
    * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { Account } from 'nexus-prisma'
    *
    * objectType({
    *   name: Account.$name
    *   description: Account.$description
    *   definition(t) {
    *     t.field(Account.provider)
    *   }
    * })
    */
  provider: {
    /**
     * The name of this field.
     */
    name: 'provider'
  
    /**
     * The type of this field.
     */
    type: 'String' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNonNullDef<'String'>
    : 'Warning/Error: The type \'String\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'String\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: undefined
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'Account', 'provider'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `Account.providerAccountId`.
    *
    * ### ️⚠️ You have not writen documentation for model Account
    *
    * Replace this default advisory JSDoc with your own documentation about model Account
    * by documenting it in your Prisma schema. For example:
    * ```prisma
    * model Account {
    *   /// Lorem ipsum dolor sit amet.
    *   providerAccountId  String
    * }
    * ```
    *
    * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { Account } from 'nexus-prisma'
    *
    * objectType({
    *   name: Account.$name
    *   description: Account.$description
    *   definition(t) {
    *     t.field(Account.providerAccountId)
    *   }
    * })
    */
  providerAccountId: {
    /**
     * The name of this field.
     */
    name: 'providerAccountId'
  
    /**
     * The type of this field.
     */
    type: 'String' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNonNullDef<'String'>
    : 'Warning/Error: The type \'String\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'String\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: undefined
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'Account', 'providerAccountId'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `Account.refresh_token`.
    *
    * ### ️⚠️ You have not writen documentation for model Account
    *
    * Replace this default advisory JSDoc with your own documentation about model Account
    * by documenting it in your Prisma schema. For example:
    * ```prisma
    * model Account {
    *   /// Lorem ipsum dolor sit amet.
    *   refresh_token  String?
    * }
    * ```
    *
    * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { Account } from 'nexus-prisma'
    *
    * objectType({
    *   name: Account.$name
    *   description: Account.$description
    *   definition(t) {
    *     t.field(Account.refresh_token)
    *   }
    * })
    */
  refresh_token: {
    /**
     * The name of this field.
     */
    name: 'refresh_token'
  
    /**
     * The type of this field.
     */
    type: 'String' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNullDef<'String'>
    : 'Warning/Error: The type \'String\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'String\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: undefined
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'Account', 'refresh_token'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `Account.access_token`.
    *
    * ### ️⚠️ You have not writen documentation for model Account
    *
    * Replace this default advisory JSDoc with your own documentation about model Account
    * by documenting it in your Prisma schema. For example:
    * ```prisma
    * model Account {
    *   /// Lorem ipsum dolor sit amet.
    *   access_token  String?
    * }
    * ```
    *
    * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { Account } from 'nexus-prisma'
    *
    * objectType({
    *   name: Account.$name
    *   description: Account.$description
    *   definition(t) {
    *     t.field(Account.access_token)
    *   }
    * })
    */
  access_token: {
    /**
     * The name of this field.
     */
    name: 'access_token'
  
    /**
     * The type of this field.
     */
    type: 'String' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNullDef<'String'>
    : 'Warning/Error: The type \'String\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'String\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: undefined
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'Account', 'access_token'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `Account.oauth_token`.
    *
    * ### ️⚠️ You have not writen documentation for model Account
    *
    * Replace this default advisory JSDoc with your own documentation about model Account
    * by documenting it in your Prisma schema. For example:
    * ```prisma
    * model Account {
    *   /// Lorem ipsum dolor sit amet.
    *   oauth_token  String?
    * }
    * ```
    *
    * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { Account } from 'nexus-prisma'
    *
    * objectType({
    *   name: Account.$name
    *   description: Account.$description
    *   definition(t) {
    *     t.field(Account.oauth_token)
    *   }
    * })
    */
  oauth_token: {
    /**
     * The name of this field.
     */
    name: 'oauth_token'
  
    /**
     * The type of this field.
     */
    type: 'String' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNullDef<'String'>
    : 'Warning/Error: The type \'String\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'String\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: undefined
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'Account', 'oauth_token'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `Account.oauth_token_secret`.
    *
    * ### ️⚠️ You have not writen documentation for model Account
    *
    * Replace this default advisory JSDoc with your own documentation about model Account
    * by documenting it in your Prisma schema. For example:
    * ```prisma
    * model Account {
    *   /// Lorem ipsum dolor sit amet.
    *   oauth_token_secret  String?
    * }
    * ```
    *
    * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { Account } from 'nexus-prisma'
    *
    * objectType({
    *   name: Account.$name
    *   description: Account.$description
    *   definition(t) {
    *     t.field(Account.oauth_token_secret)
    *   }
    * })
    */
  oauth_token_secret: {
    /**
     * The name of this field.
     */
    name: 'oauth_token_secret'
  
    /**
     * The type of this field.
     */
    type: 'String' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNullDef<'String'>
    : 'Warning/Error: The type \'String\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'String\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: undefined
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'Account', 'oauth_token_secret'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `Account.expires_at`.
    *
    * ### ️⚠️ You have not writen documentation for model Account
    *
    * Replace this default advisory JSDoc with your own documentation about model Account
    * by documenting it in your Prisma schema. For example:
    * ```prisma
    * model Account {
    *   /// Lorem ipsum dolor sit amet.
    *   expires_at  Int?
    * }
    * ```
    *
    * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { Account } from 'nexus-prisma'
    *
    * objectType({
    *   name: Account.$name
    *   description: Account.$description
    *   definition(t) {
    *     t.field(Account.expires_at)
    *   }
    * })
    */
  expires_at: {
    /**
     * The name of this field.
     */
    name: 'expires_at'
  
    /**
     * The type of this field.
     */
    type: 'Int' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNullDef<'Int'>
    : 'Warning/Error: The type \'Int\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'Int\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: undefined
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'Account', 'expires_at'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `Account.token_type`.
    *
    * ### ️⚠️ You have not writen documentation for model Account
    *
    * Replace this default advisory JSDoc with your own documentation about model Account
    * by documenting it in your Prisma schema. For example:
    * ```prisma
    * model Account {
    *   /// Lorem ipsum dolor sit amet.
    *   token_type  String?
    * }
    * ```
    *
    * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { Account } from 'nexus-prisma'
    *
    * objectType({
    *   name: Account.$name
    *   description: Account.$description
    *   definition(t) {
    *     t.field(Account.token_type)
    *   }
    * })
    */
  token_type: {
    /**
     * The name of this field.
     */
    name: 'token_type'
  
    /**
     * The type of this field.
     */
    type: 'String' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNullDef<'String'>
    : 'Warning/Error: The type \'String\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'String\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: undefined
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'Account', 'token_type'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `Account.scope`.
    *
    * ### ️⚠️ You have not writen documentation for model Account
    *
    * Replace this default advisory JSDoc with your own documentation about model Account
    * by documenting it in your Prisma schema. For example:
    * ```prisma
    * model Account {
    *   /// Lorem ipsum dolor sit amet.
    *   scope  String?
    * }
    * ```
    *
    * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { Account } from 'nexus-prisma'
    *
    * objectType({
    *   name: Account.$name
    *   description: Account.$description
    *   definition(t) {
    *     t.field(Account.scope)
    *   }
    * })
    */
  scope: {
    /**
     * The name of this field.
     */
    name: 'scope'
  
    /**
     * The type of this field.
     */
    type: 'String' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNullDef<'String'>
    : 'Warning/Error: The type \'String\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'String\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: undefined
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'Account', 'scope'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `Account.id_token`.
    *
    * ### ️⚠️ You have not writen documentation for model Account
    *
    * Replace this default advisory JSDoc with your own documentation about model Account
    * by documenting it in your Prisma schema. For example:
    * ```prisma
    * model Account {
    *   /// Lorem ipsum dolor sit amet.
    *   id_token  String?
    * }
    * ```
    *
    * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { Account } from 'nexus-prisma'
    *
    * objectType({
    *   name: Account.$name
    *   description: Account.$description
    *   definition(t) {
    *     t.field(Account.id_token)
    *   }
    * })
    */
  id_token: {
    /**
     * The name of this field.
     */
    name: 'id_token'
  
    /**
     * The type of this field.
     */
    type: 'String' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNullDef<'String'>
    : 'Warning/Error: The type \'String\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'String\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: undefined
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'Account', 'id_token'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `Account.session_state`.
    *
    * ### ️⚠️ You have not writen documentation for model Account
    *
    * Replace this default advisory JSDoc with your own documentation about model Account
    * by documenting it in your Prisma schema. For example:
    * ```prisma
    * model Account {
    *   /// Lorem ipsum dolor sit amet.
    *   session_state  String?
    * }
    * ```
    *
    * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { Account } from 'nexus-prisma'
    *
    * objectType({
    *   name: Account.$name
    *   description: Account.$description
    *   definition(t) {
    *     t.field(Account.session_state)
    *   }
    * })
    */
  session_state: {
    /**
     * The name of this field.
     */
    name: 'session_state'
  
    /**
     * The type of this field.
     */
    type: 'String' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNullDef<'String'>
    : 'Warning/Error: The type \'String\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'String\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: undefined
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'Account', 'session_state'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `Account.user`.
    *
    * ### ️⚠️ You have not writen documentation for model Account
    *
    * Replace this default advisory JSDoc with your own documentation about model Account
    * by documenting it in your Prisma schema. For example:
    * ```prisma
    * model Account {
    *   /// Lorem ipsum dolor sit amet.
    *   user  User
    * }
    * ```
    *
    * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { Account } from 'nexus-prisma'
    *
    * objectType({
    *   name: Account.$name
    *   description: Account.$description
    *   definition(t) {
    *     t.field(Account.user)
    *   }
    * })
    */
  user: {
    /**
     * The name of this field.
     */
    name: 'user'
  
    /**
     * The type of this field.
     */
    type: 'User' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNonNullDef<'User'>
    : 'Warning/Error: The type \'User\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'User\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: undefined
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'Account', 'user'>
  }
}

/**
  * Generated Nexus `objectType` configuration based on your Prisma schema's model `Session`.
  *
  * ### ️⚠️ You have not writen documentation for model Session
  *
  * Replace this default advisory JSDoc with your own documentation about model Session
  * by documenting it in your Prisma schema. For example:
  *
  * ```prisma
  * /// Lorem ipsum dolor sit amet...
  * model Session {
  *   foo  String
  * }
  * ```
  *
  * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
  *
  * @example
  *
  * import { objectType } from 'nexus'
  * import { Session } from 'nexus-prisma'
  *
  * objectType({
  *   name: Session.$name
  *   description: Session.$description
  *   definition(t) {
  *     t.field(Session.id)
  *   }
  * })
  */
export interface Session {
  $name: 'Session'
  $description: undefined
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `Session.id`.
    *
    * ### ️⚠️ You have not writen documentation for model Session
    *
    * Replace this default advisory JSDoc with your own documentation about model Session
    * by documenting it in your Prisma schema. For example:
    * ```prisma
    * model Session {
    *   /// Lorem ipsum dolor sit amet.
    *   id  String
    * }
    * ```
    *
    * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { Session } from 'nexus-prisma'
    *
    * objectType({
    *   name: Session.$name
    *   description: Session.$description
    *   definition(t) {
    *     t.field(Session.id)
    *   }
    * })
    */
  id: {
    /**
     * The name of this field.
     */
    name: 'id'
  
    /**
     * The type of this field.
     */
    type: 'ID' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNonNullDef<'ID'>
    : 'Warning/Error: The type \'ID\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'ID\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: undefined
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'Session', 'id'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `Session.sessionToken`.
    *
    * ### ️⚠️ You have not writen documentation for model Session
    *
    * Replace this default advisory JSDoc with your own documentation about model Session
    * by documenting it in your Prisma schema. For example:
    * ```prisma
    * model Session {
    *   /// Lorem ipsum dolor sit amet.
    *   sessionToken  String
    * }
    * ```
    *
    * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { Session } from 'nexus-prisma'
    *
    * objectType({
    *   name: Session.$name
    *   description: Session.$description
    *   definition(t) {
    *     t.field(Session.sessionToken)
    *   }
    * })
    */
  sessionToken: {
    /**
     * The name of this field.
     */
    name: 'sessionToken'
  
    /**
     * The type of this field.
     */
    type: 'String' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNonNullDef<'String'>
    : 'Warning/Error: The type \'String\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'String\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: undefined
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'Session', 'sessionToken'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `Session.userId`.
    *
    * ### ️⚠️ You have not writen documentation for model Session
    *
    * Replace this default advisory JSDoc with your own documentation about model Session
    * by documenting it in your Prisma schema. For example:
    * ```prisma
    * model Session {
    *   /// Lorem ipsum dolor sit amet.
    *   userId  String
    * }
    * ```
    *
    * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { Session } from 'nexus-prisma'
    *
    * objectType({
    *   name: Session.$name
    *   description: Session.$description
    *   definition(t) {
    *     t.field(Session.userId)
    *   }
    * })
    */
  userId: {
    /**
     * The name of this field.
     */
    name: 'userId'
  
    /**
     * The type of this field.
     */
    type: 'String' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNonNullDef<'String'>
    : 'Warning/Error: The type \'String\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'String\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: undefined
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'Session', 'userId'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `Session.expires`.
    *
    * ### ️⚠️ You have not writen documentation for model Session
    *
    * Replace this default advisory JSDoc with your own documentation about model Session
    * by documenting it in your Prisma schema. For example:
    * ```prisma
    * model Session {
    *   /// Lorem ipsum dolor sit amet.
    *   expires  DateTime
    * }
    * ```
    *
    * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { Session } from 'nexus-prisma'
    *
    * objectType({
    *   name: Session.$name
    *   description: Session.$description
    *   definition(t) {
    *     t.field(Session.expires)
    *   }
    * })
    */
  expires: {
    /**
     * The name of this field.
     */
    name: 'expires'
  
    /**
     * The type of this field.
     */
    type: 'DateTime' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNonNullDef<'DateTime'>
    : 'Warning/Error: The type \'DateTime\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'DateTime\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: undefined
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'Session', 'expires'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `Session.user`.
    *
    * ### ️⚠️ You have not writen documentation for model Session
    *
    * Replace this default advisory JSDoc with your own documentation about model Session
    * by documenting it in your Prisma schema. For example:
    * ```prisma
    * model Session {
    *   /// Lorem ipsum dolor sit amet.
    *   user  User
    * }
    * ```
    *
    * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { Session } from 'nexus-prisma'
    *
    * objectType({
    *   name: Session.$name
    *   description: Session.$description
    *   definition(t) {
    *     t.field(Session.user)
    *   }
    * })
    */
  user: {
    /**
     * The name of this field.
     */
    name: 'user'
  
    /**
     * The type of this field.
     */
    type: 'User' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNonNullDef<'User'>
    : 'Warning/Error: The type \'User\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'User\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: undefined
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'Session', 'user'>
  }
}

/**
  * Generated Nexus `objectType` configuration based on your Prisma schema's model `User`.
  *
  * ### ️⚠️ You have not writen documentation for model User
  *
  * Replace this default advisory JSDoc with your own documentation about model User
  * by documenting it in your Prisma schema. For example:
  *
  * ```prisma
  * /// Lorem ipsum dolor sit amet...
  * model User {
  *   foo  String
  * }
  * ```
  *
  * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
  *
  * @example
  *
  * import { objectType } from 'nexus'
  * import { User } from 'nexus-prisma'
  *
  * objectType({
  *   name: User.$name
  *   description: User.$description
  *   definition(t) {
  *     t.field(User.id)
  *   }
  * })
  */
export interface User {
  $name: 'User'
  $description: undefined
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `User.id`.
    *
    * ### ️⚠️ You have not writen documentation for model User
    *
    * Replace this default advisory JSDoc with your own documentation about model User
    * by documenting it in your Prisma schema. For example:
    * ```prisma
    * model User {
    *   /// Lorem ipsum dolor sit amet.
    *   id  String
    * }
    * ```
    *
    * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { User } from 'nexus-prisma'
    *
    * objectType({
    *   name: User.$name
    *   description: User.$description
    *   definition(t) {
    *     t.field(User.id)
    *   }
    * })
    */
  id: {
    /**
     * The name of this field.
     */
    name: 'id'
  
    /**
     * The type of this field.
     */
    type: 'ID' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNonNullDef<'ID'>
    : 'Warning/Error: The type \'ID\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'ID\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: undefined
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'User', 'id'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `User.role`.
    *
    * ### ️⚠️ You have not writen documentation for model User
    *
    * Replace this default advisory JSDoc with your own documentation about model User
    * by documenting it in your Prisma schema. For example:
    * ```prisma
    * model User {
    *   /// Lorem ipsum dolor sit amet.
    *   role  Role
    * }
    * ```
    *
    * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { User } from 'nexus-prisma'
    *
    * objectType({
    *   name: User.$name
    *   description: User.$description
    *   definition(t) {
    *     t.field(User.role)
    *   }
    * })
    */
  role: {
    /**
     * The name of this field.
     */
    name: 'role'
  
    /**
     * The type of this field.
     */
    type: 'Role' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNonNullDef<'Role'>
    : 'Warning/Error: The type \'Role\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'Role\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: undefined
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'User', 'role'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `User.name`.
    *
    * ### ️⚠️ You have not writen documentation for model User
    *
    * Replace this default advisory JSDoc with your own documentation about model User
    * by documenting it in your Prisma schema. For example:
    * ```prisma
    * model User {
    *   /// Lorem ipsum dolor sit amet.
    *   name  String?
    * }
    * ```
    *
    * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { User } from 'nexus-prisma'
    *
    * objectType({
    *   name: User.$name
    *   description: User.$description
    *   definition(t) {
    *     t.field(User.name)
    *   }
    * })
    */
  name: {
    /**
     * The name of this field.
     */
    name: 'name'
  
    /**
     * The type of this field.
     */
    type: 'String' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNullDef<'String'>
    : 'Warning/Error: The type \'String\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'String\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: undefined
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'User', 'name'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `User.email`.
    *
    * ### ️⚠️ You have not writen documentation for model User
    *
    * Replace this default advisory JSDoc with your own documentation about model User
    * by documenting it in your Prisma schema. For example:
    * ```prisma
    * model User {
    *   /// Lorem ipsum dolor sit amet.
    *   email  String?
    * }
    * ```
    *
    * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { User } from 'nexus-prisma'
    *
    * objectType({
    *   name: User.$name
    *   description: User.$description
    *   definition(t) {
    *     t.field(User.email)
    *   }
    * })
    */
  email: {
    /**
     * The name of this field.
     */
    name: 'email'
  
    /**
     * The type of this field.
     */
    type: 'String' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNullDef<'String'>
    : 'Warning/Error: The type \'String\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'String\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: undefined
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'User', 'email'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `User.emailVerified`.
    *
    * ### ️⚠️ You have not writen documentation for model User
    *
    * Replace this default advisory JSDoc with your own documentation about model User
    * by documenting it in your Prisma schema. For example:
    * ```prisma
    * model User {
    *   /// Lorem ipsum dolor sit amet.
    *   emailVerified  DateTime?
    * }
    * ```
    *
    * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { User } from 'nexus-prisma'
    *
    * objectType({
    *   name: User.$name
    *   description: User.$description
    *   definition(t) {
    *     t.field(User.emailVerified)
    *   }
    * })
    */
  emailVerified: {
    /**
     * The name of this field.
     */
    name: 'emailVerified'
  
    /**
     * The type of this field.
     */
    type: 'DateTime' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNullDef<'DateTime'>
    : 'Warning/Error: The type \'DateTime\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'DateTime\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: undefined
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'User', 'emailVerified'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `User.image`.
    *
    * ### ️⚠️ You have not writen documentation for model User
    *
    * Replace this default advisory JSDoc with your own documentation about model User
    * by documenting it in your Prisma schema. For example:
    * ```prisma
    * model User {
    *   /// Lorem ipsum dolor sit amet.
    *   image  String?
    * }
    * ```
    *
    * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { User } from 'nexus-prisma'
    *
    * objectType({
    *   name: User.$name
    *   description: User.$description
    *   definition(t) {
    *     t.field(User.image)
    *   }
    * })
    */
  image: {
    /**
     * The name of this field.
     */
    name: 'image'
  
    /**
     * The type of this field.
     */
    type: 'String' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNullDef<'String'>
    : 'Warning/Error: The type \'String\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'String\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: undefined
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'User', 'image'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `User.accounts`.
    *
    * ### ️⚠️ You have not writen documentation for model User
    *
    * Replace this default advisory JSDoc with your own documentation about model User
    * by documenting it in your Prisma schema. For example:
    * ```prisma
    * model User {
    *   /// Lorem ipsum dolor sit amet.
    *   accounts  Account
    * }
    * ```
    *
    * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { User } from 'nexus-prisma'
    *
    * objectType({
    *   name: User.$name
    *   description: User.$description
    *   definition(t) {
    *     t.field(User.accounts)
    *   }
    * })
    */
  accounts: {
    /**
     * The name of this field.
     */
    name: 'accounts'
  
    /**
     * The type of this field.
     */
    type: 'Account' extends NexusCore.GetGen<'allNamedTypes', string>
    ? (NexusCore.NexusListDef<'Account'> | NexusCore.NexusNonNullDef<'Account'>)
    : 'Warning/Error: The type \'Account\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'Account\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: undefined
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'User', 'accounts'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `User.sessions`.
    *
    * ### ️⚠️ You have not writen documentation for model User
    *
    * Replace this default advisory JSDoc with your own documentation about model User
    * by documenting it in your Prisma schema. For example:
    * ```prisma
    * model User {
    *   /// Lorem ipsum dolor sit amet.
    *   sessions  Session
    * }
    * ```
    *
    * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { User } from 'nexus-prisma'
    *
    * objectType({
    *   name: User.$name
    *   description: User.$description
    *   definition(t) {
    *     t.field(User.sessions)
    *   }
    * })
    */
  sessions: {
    /**
     * The name of this field.
     */
    name: 'sessions'
  
    /**
     * The type of this field.
     */
    type: 'Session' extends NexusCore.GetGen<'allNamedTypes', string>
    ? (NexusCore.NexusListDef<'Session'> | NexusCore.NexusNonNullDef<'Session'>)
    : 'Warning/Error: The type \'Session\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'Session\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: undefined
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'User', 'sessions'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `User.ratings`.
    *
    * ### ️⚠️ You have not writen documentation for model User
    *
    * Replace this default advisory JSDoc with your own documentation about model User
    * by documenting it in your Prisma schema. For example:
    * ```prisma
    * model User {
    *   /// Lorem ipsum dolor sit amet.
    *   ratings  Rating
    * }
    * ```
    *
    * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { User } from 'nexus-prisma'
    *
    * objectType({
    *   name: User.$name
    *   description: User.$description
    *   definition(t) {
    *     t.field(User.ratings)
    *   }
    * })
    */
  ratings: {
    /**
     * The name of this field.
     */
    name: 'ratings'
  
    /**
     * The type of this field.
     */
    type: 'Rating' extends NexusCore.GetGen<'allNamedTypes', string>
    ? (NexusCore.NexusListDef<'Rating'> | NexusCore.NexusNonNullDef<'Rating'>)
    : 'Warning/Error: The type \'Rating\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'Rating\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: undefined
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'User', 'ratings'>
  }
}

/**
  * Generated Nexus `objectType` configuration based on your Prisma schema's model `VerificationToken`.
  *
  * ### ️⚠️ You have not writen documentation for model VerificationToken
  *
  * Replace this default advisory JSDoc with your own documentation about model VerificationToken
  * by documenting it in your Prisma schema. For example:
  *
  * ```prisma
  * /// Lorem ipsum dolor sit amet...
  * model VerificationToken {
  *   foo  String
  * }
  * ```
  *
  * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
  *
  * @example
  *
  * import { objectType } from 'nexus'
  * import { VerificationToken } from 'nexus-prisma'
  *
  * objectType({
  *   name: VerificationToken.$name
  *   description: VerificationToken.$description
  *   definition(t) {
  *     t.field(VerificationToken.id)
  *   }
  * })
  */
export interface VerificationToken {
  $name: 'VerificationToken'
  $description: undefined
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `VerificationToken.identifier`.
    *
    * ### ️⚠️ You have not writen documentation for model VerificationToken
    *
    * Replace this default advisory JSDoc with your own documentation about model VerificationToken
    * by documenting it in your Prisma schema. For example:
    * ```prisma
    * model VerificationToken {
    *   /// Lorem ipsum dolor sit amet.
    *   identifier  String
    * }
    * ```
    *
    * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { VerificationToken } from 'nexus-prisma'
    *
    * objectType({
    *   name: VerificationToken.$name
    *   description: VerificationToken.$description
    *   definition(t) {
    *     t.field(VerificationToken.identifier)
    *   }
    * })
    */
  identifier: {
    /**
     * The name of this field.
     */
    name: 'identifier'
  
    /**
     * The type of this field.
     */
    type: 'String' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNonNullDef<'String'>
    : 'Warning/Error: The type \'String\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'String\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: undefined
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'VerificationToken', 'identifier'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `VerificationToken.token`.
    *
    * ### ️⚠️ You have not writen documentation for model VerificationToken
    *
    * Replace this default advisory JSDoc with your own documentation about model VerificationToken
    * by documenting it in your Prisma schema. For example:
    * ```prisma
    * model VerificationToken {
    *   /// Lorem ipsum dolor sit amet.
    *   token  String
    * }
    * ```
    *
    * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { VerificationToken } from 'nexus-prisma'
    *
    * objectType({
    *   name: VerificationToken.$name
    *   description: VerificationToken.$description
    *   definition(t) {
    *     t.field(VerificationToken.token)
    *   }
    * })
    */
  token: {
    /**
     * The name of this field.
     */
    name: 'token'
  
    /**
     * The type of this field.
     */
    type: 'String' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNonNullDef<'String'>
    : 'Warning/Error: The type \'String\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'String\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: undefined
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'VerificationToken', 'token'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `VerificationToken.expires`.
    *
    * ### ️⚠️ You have not writen documentation for model VerificationToken
    *
    * Replace this default advisory JSDoc with your own documentation about model VerificationToken
    * by documenting it in your Prisma schema. For example:
    * ```prisma
    * model VerificationToken {
    *   /// Lorem ipsum dolor sit amet.
    *   expires  DateTime
    * }
    * ```
    *
    * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { VerificationToken } from 'nexus-prisma'
    *
    * objectType({
    *   name: VerificationToken.$name
    *   description: VerificationToken.$description
    *   definition(t) {
    *     t.field(VerificationToken.expires)
    *   }
    * })
    */
  expires: {
    /**
     * The name of this field.
     */
    name: 'expires'
  
    /**
     * The type of this field.
     */
    type: 'DateTime' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNonNullDef<'DateTime'>
    : 'Warning/Error: The type \'DateTime\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'DateTime\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: undefined
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'VerificationToken', 'expires'>
  }
}

/**
  * Generated Nexus `objectType` configuration based on your Prisma schema's model `Player`.
  *
  * ### ️⚠️ You have not writen documentation for model Player
  *
  * Replace this default advisory JSDoc with your own documentation about model Player
  * by documenting it in your Prisma schema. For example:
  *
  * ```prisma
  * /// Lorem ipsum dolor sit amet...
  * model Player {
  *   foo  String
  * }
  * ```
  *
  * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
  *
  * @example
  *
  * import { objectType } from 'nexus'
  * import { Player } from 'nexus-prisma'
  *
  * objectType({
  *   name: Player.$name
  *   description: Player.$description
  *   definition(t) {
  *     t.field(Player.id)
  *   }
  * })
  */
export interface Player {
  $name: 'Player'
  $description: undefined
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `Player.id`.
    *
    * ### ️⚠️ You have not writen documentation for model Player
    *
    * Replace this default advisory JSDoc with your own documentation about model Player
    * by documenting it in your Prisma schema. For example:
    * ```prisma
    * model Player {
    *   /// Lorem ipsum dolor sit amet.
    *   id  String
    * }
    * ```
    *
    * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { Player } from 'nexus-prisma'
    *
    * objectType({
    *   name: Player.$name
    *   description: Player.$description
    *   definition(t) {
    *     t.field(Player.id)
    *   }
    * })
    */
  id: {
    /**
     * The name of this field.
     */
    name: 'id'
  
    /**
     * The type of this field.
     */
    type: 'ID' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNonNullDef<'ID'>
    : 'Warning/Error: The type \'ID\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'ID\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: undefined
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'Player', 'id'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `Player.firstName`.
    *
    * ### ️⚠️ You have not writen documentation for model Player
    *
    * Replace this default advisory JSDoc with your own documentation about model Player
    * by documenting it in your Prisma schema. For example:
    * ```prisma
    * model Player {
    *   /// Lorem ipsum dolor sit amet.
    *   firstName  String
    * }
    * ```
    *
    * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { Player } from 'nexus-prisma'
    *
    * objectType({
    *   name: Player.$name
    *   description: Player.$description
    *   definition(t) {
    *     t.field(Player.firstName)
    *   }
    * })
    */
  firstName: {
    /**
     * The name of this field.
     */
    name: 'firstName'
  
    /**
     * The type of this field.
     */
    type: 'String' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNonNullDef<'String'>
    : 'Warning/Error: The type \'String\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'String\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: undefined
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'Player', 'firstName'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `Player.lastName`.
    *
    * ### ️⚠️ You have not writen documentation for model Player
    *
    * Replace this default advisory JSDoc with your own documentation about model Player
    * by documenting it in your Prisma schema. For example:
    * ```prisma
    * model Player {
    *   /// Lorem ipsum dolor sit amet.
    *   lastName  String
    * }
    * ```
    *
    * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { Player } from 'nexus-prisma'
    *
    * objectType({
    *   name: Player.$name
    *   description: Player.$description
    *   definition(t) {
    *     t.field(Player.lastName)
    *   }
    * })
    */
  lastName: {
    /**
     * The name of this field.
     */
    name: 'lastName'
  
    /**
     * The type of this field.
     */
    type: 'String' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNonNullDef<'String'>
    : 'Warning/Error: The type \'String\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'String\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: undefined
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'Player', 'lastName'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `Player.country`.
    *
    * ### ️⚠️ You have not writen documentation for model Player
    *
    * Replace this default advisory JSDoc with your own documentation about model Player
    * by documenting it in your Prisma schema. For example:
    * ```prisma
    * model Player {
    *   /// Lorem ipsum dolor sit amet.
    *   country  String
    * }
    * ```
    *
    * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { Player } from 'nexus-prisma'
    *
    * objectType({
    *   name: Player.$name
    *   description: Player.$description
    *   definition(t) {
    *     t.field(Player.country)
    *   }
    * })
    */
  country: {
    /**
     * The name of this field.
     */
    name: 'country'
  
    /**
     * The type of this field.
     */
    type: 'String' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNonNullDef<'String'>
    : 'Warning/Error: The type \'String\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'String\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: undefined
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'Player', 'country'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `Player.countryCode`.
    *
    * ### ️⚠️ You have not writen documentation for model Player
    *
    * Replace this default advisory JSDoc with your own documentation about model Player
    * by documenting it in your Prisma schema. For example:
    * ```prisma
    * model Player {
    *   /// Lorem ipsum dolor sit amet.
    *   countryCode  String
    * }
    * ```
    *
    * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { Player } from 'nexus-prisma'
    *
    * objectType({
    *   name: Player.$name
    *   description: Player.$description
    *   definition(t) {
    *     t.field(Player.countryCode)
    *   }
    * })
    */
  countryCode: {
    /**
     * The name of this field.
     */
    name: 'countryCode'
  
    /**
     * The type of this field.
     */
    type: 'String' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNonNullDef<'String'>
    : 'Warning/Error: The type \'String\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'String\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: undefined
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'Player', 'countryCode'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `Player.birthDate`.
    *
    * ### ️⚠️ You have not writen documentation for model Player
    *
    * Replace this default advisory JSDoc with your own documentation about model Player
    * by documenting it in your Prisma schema. For example:
    * ```prisma
    * model Player {
    *   /// Lorem ipsum dolor sit amet.
    *   birthDate  DateTime
    * }
    * ```
    *
    * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { Player } from 'nexus-prisma'
    *
    * objectType({
    *   name: Player.$name
    *   description: Player.$description
    *   definition(t) {
    *     t.field(Player.birthDate)
    *   }
    * })
    */
  birthDate: {
    /**
     * The name of this field.
     */
    name: 'birthDate'
  
    /**
     * The type of this field.
     */
    type: 'DateTime' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNonNullDef<'DateTime'>
    : 'Warning/Error: The type \'DateTime\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'DateTime\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: undefined
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'Player', 'birthDate'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `Player.active`.
    *
    * ### ️⚠️ You have not writen documentation for model Player
    *
    * Replace this default advisory JSDoc with your own documentation about model Player
    * by documenting it in your Prisma schema. For example:
    * ```prisma
    * model Player {
    *   /// Lorem ipsum dolor sit amet.
    *   active  Boolean
    * }
    * ```
    *
    * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { Player } from 'nexus-prisma'
    *
    * objectType({
    *   name: Player.$name
    *   description: Player.$description
    *   definition(t) {
    *     t.field(Player.active)
    *   }
    * })
    */
  active: {
    /**
     * The name of this field.
     */
    name: 'active'
  
    /**
     * The type of this field.
     */
    type: 'Boolean' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNonNullDef<'Boolean'>
    : 'Warning/Error: The type \'Boolean\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'Boolean\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: undefined
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'Player', 'active'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `Player.image`.
    *
    * ### ️⚠️ You have not writen documentation for model Player
    *
    * Replace this default advisory JSDoc with your own documentation about model Player
    * by documenting it in your Prisma schema. For example:
    * ```prisma
    * model Player {
    *   /// Lorem ipsum dolor sit amet.
    *   image  String
    * }
    * ```
    *
    * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { Player } from 'nexus-prisma'
    *
    * objectType({
    *   name: Player.$name
    *   description: Player.$description
    *   definition(t) {
    *     t.field(Player.image)
    *   }
    * })
    */
  image: {
    /**
     * The name of this field.
     */
    name: 'image'
  
    /**
     * The type of this field.
     */
    type: 'String' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNonNullDef<'String'>
    : 'Warning/Error: The type \'String\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'String\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: undefined
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'Player', 'image'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `Player.matches`.
    *
    * ### ️⚠️ You have not writen documentation for model Player
    *
    * Replace this default advisory JSDoc with your own documentation about model Player
    * by documenting it in your Prisma schema. For example:
    * ```prisma
    * model Player {
    *   /// Lorem ipsum dolor sit amet.
    *   matches  MatchPlayer
    * }
    * ```
    *
    * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { Player } from 'nexus-prisma'
    *
    * objectType({
    *   name: Player.$name
    *   description: Player.$description
    *   definition(t) {
    *     t.field(Player.matches)
    *   }
    * })
    */
  matches: {
    /**
     * The name of this field.
     */
    name: 'matches'
  
    /**
     * The type of this field.
     */
    type: 'MatchPlayer' extends NexusCore.GetGen<'allNamedTypes', string>
    ? (NexusCore.NexusListDef<'MatchPlayer'> | NexusCore.NexusNonNullDef<'MatchPlayer'>)
    : 'Warning/Error: The type \'MatchPlayer\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'MatchPlayer\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: undefined
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'Player', 'matches'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `Player.seasons`.
    *
    * ### ️⚠️ You have not writen documentation for model Player
    *
    * Replace this default advisory JSDoc with your own documentation about model Player
    * by documenting it in your Prisma schema. For example:
    * ```prisma
    * model Player {
    *   /// Lorem ipsum dolor sit amet.
    *   seasons  SeasonPlayer
    * }
    * ```
    *
    * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { Player } from 'nexus-prisma'
    *
    * objectType({
    *   name: Player.$name
    *   description: Player.$description
    *   definition(t) {
    *     t.field(Player.seasons)
    *   }
    * })
    */
  seasons: {
    /**
     * The name of this field.
     */
    name: 'seasons'
  
    /**
     * The type of this field.
     */
    type: 'SeasonPlayer' extends NexusCore.GetGen<'allNamedTypes', string>
    ? (NexusCore.NexusListDef<'SeasonPlayer'> | NexusCore.NexusNonNullDef<'SeasonPlayer'>)
    : 'Warning/Error: The type \'SeasonPlayer\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'SeasonPlayer\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: undefined
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'Player', 'seasons'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `Player.ratings`.
    *
    * ### ️⚠️ You have not writen documentation for model Player
    *
    * Replace this default advisory JSDoc with your own documentation about model Player
    * by documenting it in your Prisma schema. For example:
    * ```prisma
    * model Player {
    *   /// Lorem ipsum dolor sit amet.
    *   ratings  Rating
    * }
    * ```
    *
    * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { Player } from 'nexus-prisma'
    *
    * objectType({
    *   name: Player.$name
    *   description: Player.$description
    *   definition(t) {
    *     t.field(Player.ratings)
    *   }
    * })
    */
  ratings: {
    /**
     * The name of this field.
     */
    name: 'ratings'
  
    /**
     * The type of this field.
     */
    type: 'Rating' extends NexusCore.GetGen<'allNamedTypes', string>
    ? (NexusCore.NexusListDef<'Rating'> | NexusCore.NexusNonNullDef<'Rating'>)
    : 'Warning/Error: The type \'Rating\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'Rating\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: undefined
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'Player', 'ratings'>
  }
}

/**
  * Generated Nexus `objectType` configuration based on your Prisma schema's model `Club`.
  *
  * ### ️⚠️ You have not writen documentation for model Club
  *
  * Replace this default advisory JSDoc with your own documentation about model Club
  * by documenting it in your Prisma schema. For example:
  *
  * ```prisma
  * /// Lorem ipsum dolor sit amet...
  * model Club {
  *   foo  String
  * }
  * ```
  *
  * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
  *
  * @example
  *
  * import { objectType } from 'nexus'
  * import { Club } from 'nexus-prisma'
  *
  * objectType({
  *   name: Club.$name
  *   description: Club.$description
  *   definition(t) {
  *     t.field(Club.id)
  *   }
  * })
  */
export interface Club {
  $name: 'Club'
  $description: undefined
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `Club.id`.
    *
    * ### ️⚠️ You have not writen documentation for model Club
    *
    * Replace this default advisory JSDoc with your own documentation about model Club
    * by documenting it in your Prisma schema. For example:
    * ```prisma
    * model Club {
    *   /// Lorem ipsum dolor sit amet.
    *   id  String
    * }
    * ```
    *
    * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { Club } from 'nexus-prisma'
    *
    * objectType({
    *   name: Club.$name
    *   description: Club.$description
    *   definition(t) {
    *     t.field(Club.id)
    *   }
    * })
    */
  id: {
    /**
     * The name of this field.
     */
    name: 'id'
  
    /**
     * The type of this field.
     */
    type: 'ID' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNonNullDef<'ID'>
    : 'Warning/Error: The type \'ID\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'ID\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: undefined
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'Club', 'id'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `Club.name`.
    *
    * ### ️⚠️ You have not writen documentation for model Club
    *
    * Replace this default advisory JSDoc with your own documentation about model Club
    * by documenting it in your Prisma schema. For example:
    * ```prisma
    * model Club {
    *   /// Lorem ipsum dolor sit amet.
    *   name  String
    * }
    * ```
    *
    * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { Club } from 'nexus-prisma'
    *
    * objectType({
    *   name: Club.$name
    *   description: Club.$description
    *   definition(t) {
    *     t.field(Club.name)
    *   }
    * })
    */
  name: {
    /**
     * The name of this field.
     */
    name: 'name'
  
    /**
     * The type of this field.
     */
    type: 'String' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNonNullDef<'String'>
    : 'Warning/Error: The type \'String\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'String\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: undefined
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'Club', 'name'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `Club.abbreviation`.
    *
    * ### ️⚠️ You have not writen documentation for model Club
    *
    * Replace this default advisory JSDoc with your own documentation about model Club
    * by documenting it in your Prisma schema. For example:
    * ```prisma
    * model Club {
    *   /// Lorem ipsum dolor sit amet.
    *   abbreviation  String
    * }
    * ```
    *
    * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { Club } from 'nexus-prisma'
    *
    * objectType({
    *   name: Club.$name
    *   description: Club.$description
    *   definition(t) {
    *     t.field(Club.abbreviation)
    *   }
    * })
    */
  abbreviation: {
    /**
     * The name of this field.
     */
    name: 'abbreviation'
  
    /**
     * The type of this field.
     */
    type: 'String' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNonNullDef<'String'>
    : 'Warning/Error: The type \'String\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'String\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: undefined
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'Club', 'abbreviation'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `Club.primary`.
    *
    * ### ️⚠️ You have not writen documentation for model Club
    *
    * Replace this default advisory JSDoc with your own documentation about model Club
    * by documenting it in your Prisma schema. For example:
    * ```prisma
    * model Club {
    *   /// Lorem ipsum dolor sit amet.
    *   primary  String
    * }
    * ```
    *
    * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { Club } from 'nexus-prisma'
    *
    * objectType({
    *   name: Club.$name
    *   description: Club.$description
    *   definition(t) {
    *     t.field(Club.primary)
    *   }
    * })
    */
  primary: {
    /**
     * The name of this field.
     */
    name: 'primary'
  
    /**
     * The type of this field.
     */
    type: 'String' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNonNullDef<'String'>
    : 'Warning/Error: The type \'String\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'String\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: undefined
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'Club', 'primary'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `Club.secondary`.
    *
    * ### ️⚠️ You have not writen documentation for model Club
    *
    * Replace this default advisory JSDoc with your own documentation about model Club
    * by documenting it in your Prisma schema. For example:
    * ```prisma
    * model Club {
    *   /// Lorem ipsum dolor sit amet.
    *   secondary  String
    * }
    * ```
    *
    * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { Club } from 'nexus-prisma'
    *
    * objectType({
    *   name: Club.$name
    *   description: Club.$description
    *   definition(t) {
    *     t.field(Club.secondary)
    *   }
    * })
    */
  secondary: {
    /**
     * The name of this field.
     */
    name: 'secondary'
  
    /**
     * The type of this field.
     */
    type: 'String' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNonNullDef<'String'>
    : 'Warning/Error: The type \'String\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'String\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: undefined
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'Club', 'secondary'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `Club.matches`.
    *
    * ### ️⚠️ You have not writen documentation for model Club
    *
    * Replace this default advisory JSDoc with your own documentation about model Club
    * by documenting it in your Prisma schema. For example:
    * ```prisma
    * model Club {
    *   /// Lorem ipsum dolor sit amet.
    *   matches  Match
    * }
    * ```
    *
    * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { Club } from 'nexus-prisma'
    *
    * objectType({
    *   name: Club.$name
    *   description: Club.$description
    *   definition(t) {
    *     t.field(Club.matches)
    *   }
    * })
    */
  matches: {
    /**
     * The name of this field.
     */
    name: 'matches'
  
    /**
     * The type of this field.
     */
    type: 'Match' extends NexusCore.GetGen<'allNamedTypes', string>
    ? (NexusCore.NexusListDef<'Match'> | NexusCore.NexusNonNullDef<'Match'>)
    : 'Warning/Error: The type \'Match\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'Match\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: undefined
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'Club', 'matches'>
  }
}

/**
  * Generated Nexus `objectType` configuration based on your Prisma schema's model `Season`.
  *
  * ### ️⚠️ You have not writen documentation for model Season
  *
  * Replace this default advisory JSDoc with your own documentation about model Season
  * by documenting it in your Prisma schema. For example:
  *
  * ```prisma
  * /// Lorem ipsum dolor sit amet...
  * model Season {
  *   foo  String
  * }
  * ```
  *
  * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
  *
  * @example
  *
  * import { objectType } from 'nexus'
  * import { Season } from 'nexus-prisma'
  *
  * objectType({
  *   name: Season.$name
  *   description: Season.$description
  *   definition(t) {
  *     t.field(Season.id)
  *   }
  * })
  */
export interface Season {
  $name: 'Season'
  $description: undefined
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `Season.id`.
    *
    * ### ️⚠️ You have not writen documentation for model Season
    *
    * Replace this default advisory JSDoc with your own documentation about model Season
    * by documenting it in your Prisma schema. For example:
    * ```prisma
    * model Season {
    *   /// Lorem ipsum dolor sit amet.
    *   id  String
    * }
    * ```
    *
    * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { Season } from 'nexus-prisma'
    *
    * objectType({
    *   name: Season.$name
    *   description: Season.$description
    *   definition(t) {
    *     t.field(Season.id)
    *   }
    * })
    */
  id: {
    /**
     * The name of this field.
     */
    name: 'id'
  
    /**
     * The type of this field.
     */
    type: 'ID' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNonNullDef<'ID'>
    : 'Warning/Error: The type \'ID\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'ID\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: undefined
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'Season', 'id'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `Season.startDate`.
    *
    * ### ️⚠️ You have not writen documentation for model Season
    *
    * Replace this default advisory JSDoc with your own documentation about model Season
    * by documenting it in your Prisma schema. For example:
    * ```prisma
    * model Season {
    *   /// Lorem ipsum dolor sit amet.
    *   startDate  DateTime
    * }
    * ```
    *
    * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { Season } from 'nexus-prisma'
    *
    * objectType({
    *   name: Season.$name
    *   description: Season.$description
    *   definition(t) {
    *     t.field(Season.startDate)
    *   }
    * })
    */
  startDate: {
    /**
     * The name of this field.
     */
    name: 'startDate'
  
    /**
     * The type of this field.
     */
    type: 'DateTime' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNonNullDef<'DateTime'>
    : 'Warning/Error: The type \'DateTime\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'DateTime\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: undefined
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'Season', 'startDate'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `Season.matches`.
    *
    * ### ️⚠️ You have not writen documentation for model Season
    *
    * Replace this default advisory JSDoc with your own documentation about model Season
    * by documenting it in your Prisma schema. For example:
    * ```prisma
    * model Season {
    *   /// Lorem ipsum dolor sit amet.
    *   matches  Match
    * }
    * ```
    *
    * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { Season } from 'nexus-prisma'
    *
    * objectType({
    *   name: Season.$name
    *   description: Season.$description
    *   definition(t) {
    *     t.field(Season.matches)
    *   }
    * })
    */
  matches: {
    /**
     * The name of this field.
     */
    name: 'matches'
  
    /**
     * The type of this field.
     */
    type: 'Match' extends NexusCore.GetGen<'allNamedTypes', string>
    ? (NexusCore.NexusListDef<'Match'> | NexusCore.NexusNonNullDef<'Match'>)
    : 'Warning/Error: The type \'Match\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'Match\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: undefined
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'Season', 'matches'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `Season.players`.
    *
    * ### ️⚠️ You have not writen documentation for model Season
    *
    * Replace this default advisory JSDoc with your own documentation about model Season
    * by documenting it in your Prisma schema. For example:
    * ```prisma
    * model Season {
    *   /// Lorem ipsum dolor sit amet.
    *   players  SeasonPlayer
    * }
    * ```
    *
    * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { Season } from 'nexus-prisma'
    *
    * objectType({
    *   name: Season.$name
    *   description: Season.$description
    *   definition(t) {
    *     t.field(Season.players)
    *   }
    * })
    */
  players: {
    /**
     * The name of this field.
     */
    name: 'players'
  
    /**
     * The type of this field.
     */
    type: 'SeasonPlayer' extends NexusCore.GetGen<'allNamedTypes', string>
    ? (NexusCore.NexusListDef<'SeasonPlayer'> | NexusCore.NexusNonNullDef<'SeasonPlayer'>)
    : 'Warning/Error: The type \'SeasonPlayer\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'SeasonPlayer\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: undefined
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'Season', 'players'>
  }
}

/**
  * Generated Nexus `objectType` configuration based on your Prisma schema's model `Competition`.
  *
  * ### ️⚠️ You have not writen documentation for model Competition
  *
  * Replace this default advisory JSDoc with your own documentation about model Competition
  * by documenting it in your Prisma schema. For example:
  *
  * ```prisma
  * /// Lorem ipsum dolor sit amet...
  * model Competition {
  *   foo  String
  * }
  * ```
  *
  * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
  *
  * @example
  *
  * import { objectType } from 'nexus'
  * import { Competition } from 'nexus-prisma'
  *
  * objectType({
  *   name: Competition.$name
  *   description: Competition.$description
  *   definition(t) {
  *     t.field(Competition.id)
  *   }
  * })
  */
export interface Competition {
  $name: 'Competition'
  $description: undefined
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `Competition.id`.
    *
    * ### ️⚠️ You have not writen documentation for model Competition
    *
    * Replace this default advisory JSDoc with your own documentation about model Competition
    * by documenting it in your Prisma schema. For example:
    * ```prisma
    * model Competition {
    *   /// Lorem ipsum dolor sit amet.
    *   id  String
    * }
    * ```
    *
    * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { Competition } from 'nexus-prisma'
    *
    * objectType({
    *   name: Competition.$name
    *   description: Competition.$description
    *   definition(t) {
    *     t.field(Competition.id)
    *   }
    * })
    */
  id: {
    /**
     * The name of this field.
     */
    name: 'id'
  
    /**
     * The type of this field.
     */
    type: 'ID' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNonNullDef<'ID'>
    : 'Warning/Error: The type \'ID\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'ID\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: undefined
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'Competition', 'id'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `Competition.name`.
    *
    * ### ️⚠️ You have not writen documentation for model Competition
    *
    * Replace this default advisory JSDoc with your own documentation about model Competition
    * by documenting it in your Prisma schema. For example:
    * ```prisma
    * model Competition {
    *   /// Lorem ipsum dolor sit amet.
    *   name  String
    * }
    * ```
    *
    * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { Competition } from 'nexus-prisma'
    *
    * objectType({
    *   name: Competition.$name
    *   description: Competition.$description
    *   definition(t) {
    *     t.field(Competition.name)
    *   }
    * })
    */
  name: {
    /**
     * The name of this field.
     */
    name: 'name'
  
    /**
     * The type of this field.
     */
    type: 'String' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNonNullDef<'String'>
    : 'Warning/Error: The type \'String\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'String\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: undefined
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'Competition', 'name'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `Competition.abbreviation`.
    *
    * ### ️⚠️ You have not writen documentation for model Competition
    *
    * Replace this default advisory JSDoc with your own documentation about model Competition
    * by documenting it in your Prisma schema. For example:
    * ```prisma
    * model Competition {
    *   /// Lorem ipsum dolor sit amet.
    *   abbreviation  String
    * }
    * ```
    *
    * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { Competition } from 'nexus-prisma'
    *
    * objectType({
    *   name: Competition.$name
    *   description: Competition.$description
    *   definition(t) {
    *     t.field(Competition.abbreviation)
    *   }
    * })
    */
  abbreviation: {
    /**
     * The name of this field.
     */
    name: 'abbreviation'
  
    /**
     * The type of this field.
     */
    type: 'String' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNonNullDef<'String'>
    : 'Warning/Error: The type \'String\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'String\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: undefined
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'Competition', 'abbreviation'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `Competition.matches`.
    *
    * ### ️⚠️ You have not writen documentation for model Competition
    *
    * Replace this default advisory JSDoc with your own documentation about model Competition
    * by documenting it in your Prisma schema. For example:
    * ```prisma
    * model Competition {
    *   /// Lorem ipsum dolor sit amet.
    *   matches  Match
    * }
    * ```
    *
    * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { Competition } from 'nexus-prisma'
    *
    * objectType({
    *   name: Competition.$name
    *   description: Competition.$description
    *   definition(t) {
    *     t.field(Competition.matches)
    *   }
    * })
    */
  matches: {
    /**
     * The name of this field.
     */
    name: 'matches'
  
    /**
     * The type of this field.
     */
    type: 'Match' extends NexusCore.GetGen<'allNamedTypes', string>
    ? (NexusCore.NexusListDef<'Match'> | NexusCore.NexusNonNullDef<'Match'>)
    : 'Warning/Error: The type \'Match\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'Match\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: undefined
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'Competition', 'matches'>
  }
}

/**
  * Generated Nexus `objectType` configuration based on your Prisma schema's model `Match`.
  *
  * ### ️⚠️ You have not writen documentation for model Match
  *
  * Replace this default advisory JSDoc with your own documentation about model Match
  * by documenting it in your Prisma schema. For example:
  *
  * ```prisma
  * /// Lorem ipsum dolor sit amet...
  * model Match {
  *   foo  String
  * }
  * ```
  *
  * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
  *
  * @example
  *
  * import { objectType } from 'nexus'
  * import { Match } from 'nexus-prisma'
  *
  * objectType({
  *   name: Match.$name
  *   description: Match.$description
  *   definition(t) {
  *     t.field(Match.id)
  *   }
  * })
  */
export interface Match {
  $name: 'Match'
  $description: undefined
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `Match.id`.
    *
    * ### ️⚠️ You have not writen documentation for model Match
    *
    * Replace this default advisory JSDoc with your own documentation about model Match
    * by documenting it in your Prisma schema. For example:
    * ```prisma
    * model Match {
    *   /// Lorem ipsum dolor sit amet.
    *   id  String
    * }
    * ```
    *
    * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { Match } from 'nexus-prisma'
    *
    * objectType({
    *   name: Match.$name
    *   description: Match.$description
    *   definition(t) {
    *     t.field(Match.id)
    *   }
    * })
    */
  id: {
    /**
     * The name of this field.
     */
    name: 'id'
  
    /**
     * The type of this field.
     */
    type: 'ID' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNonNullDef<'ID'>
    : 'Warning/Error: The type \'ID\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'ID\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: undefined
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'Match', 'id'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `Match.date`.
    *
    * ### ️⚠️ You have not writen documentation for model Match
    *
    * Replace this default advisory JSDoc with your own documentation about model Match
    * by documenting it in your Prisma schema. For example:
    * ```prisma
    * model Match {
    *   /// Lorem ipsum dolor sit amet.
    *   date  DateTime
    * }
    * ```
    *
    * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { Match } from 'nexus-prisma'
    *
    * objectType({
    *   name: Match.$name
    *   description: Match.$description
    *   definition(t) {
    *     t.field(Match.date)
    *   }
    * })
    */
  date: {
    /**
     * The name of this field.
     */
    name: 'date'
  
    /**
     * The type of this field.
     */
    type: 'DateTime' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNonNullDef<'DateTime'>
    : 'Warning/Error: The type \'DateTime\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'DateTime\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: undefined
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'Match', 'date'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `Match.home`.
    *
    * ### ️⚠️ You have not writen documentation for model Match
    *
    * Replace this default advisory JSDoc with your own documentation about model Match
    * by documenting it in your Prisma schema. For example:
    * ```prisma
    * model Match {
    *   /// Lorem ipsum dolor sit amet.
    *   home  Boolean
    * }
    * ```
    *
    * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { Match } from 'nexus-prisma'
    *
    * objectType({
    *   name: Match.$name
    *   description: Match.$description
    *   definition(t) {
    *     t.field(Match.home)
    *   }
    * })
    */
  home: {
    /**
     * The name of this field.
     */
    name: 'home'
  
    /**
     * The type of this field.
     */
    type: 'Boolean' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNonNullDef<'Boolean'>
    : 'Warning/Error: The type \'Boolean\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'Boolean\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: undefined
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'Match', 'home'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `Match.scored`.
    *
    * ### ️⚠️ You have not writen documentation for model Match
    *
    * Replace this default advisory JSDoc with your own documentation about model Match
    * by documenting it in your Prisma schema. For example:
    * ```prisma
    * model Match {
    *   /// Lorem ipsum dolor sit amet.
    *   scored  Int
    * }
    * ```
    *
    * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { Match } from 'nexus-prisma'
    *
    * objectType({
    *   name: Match.$name
    *   description: Match.$description
    *   definition(t) {
    *     t.field(Match.scored)
    *   }
    * })
    */
  scored: {
    /**
     * The name of this field.
     */
    name: 'scored'
  
    /**
     * The type of this field.
     */
    type: 'Int' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNonNullDef<'Int'>
    : 'Warning/Error: The type \'Int\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'Int\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: undefined
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'Match', 'scored'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `Match.conceeded`.
    *
    * ### ️⚠️ You have not writen documentation for model Match
    *
    * Replace this default advisory JSDoc with your own documentation about model Match
    * by documenting it in your Prisma schema. For example:
    * ```prisma
    * model Match {
    *   /// Lorem ipsum dolor sit amet.
    *   conceeded  Int
    * }
    * ```
    *
    * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { Match } from 'nexus-prisma'
    *
    * objectType({
    *   name: Match.$name
    *   description: Match.$description
    *   definition(t) {
    *     t.field(Match.conceeded)
    *   }
    * })
    */
  conceeded: {
    /**
     * The name of this field.
     */
    name: 'conceeded'
  
    /**
     * The type of this field.
     */
    type: 'Int' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNonNullDef<'Int'>
    : 'Warning/Error: The type \'Int\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'Int\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: undefined
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'Match', 'conceeded'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `Match.active`.
    *
    * ### ️⚠️ You have not writen documentation for model Match
    *
    * Replace this default advisory JSDoc with your own documentation about model Match
    * by documenting it in your Prisma schema. For example:
    * ```prisma
    * model Match {
    *   /// Lorem ipsum dolor sit amet.
    *   active  Boolean
    * }
    * ```
    *
    * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { Match } from 'nexus-prisma'
    *
    * objectType({
    *   name: Match.$name
    *   description: Match.$description
    *   definition(t) {
    *     t.field(Match.active)
    *   }
    * })
    */
  active: {
    /**
     * The name of this field.
     */
    name: 'active'
  
    /**
     * The type of this field.
     */
    type: 'Boolean' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNonNullDef<'Boolean'>
    : 'Warning/Error: The type \'Boolean\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'Boolean\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: undefined
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'Match', 'active'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `Match.archived`.
    *
    * ### ️⚠️ You have not writen documentation for model Match
    *
    * Replace this default advisory JSDoc with your own documentation about model Match
    * by documenting it in your Prisma schema. For example:
    * ```prisma
    * model Match {
    *   /// Lorem ipsum dolor sit amet.
    *   archived  Boolean
    * }
    * ```
    *
    * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { Match } from 'nexus-prisma'
    *
    * objectType({
    *   name: Match.$name
    *   description: Match.$description
    *   definition(t) {
    *     t.field(Match.archived)
    *   }
    * })
    */
  archived: {
    /**
     * The name of this field.
     */
    name: 'archived'
  
    /**
     * The type of this field.
     */
    type: 'Boolean' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNonNullDef<'Boolean'>
    : 'Warning/Error: The type \'Boolean\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'Boolean\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: undefined
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'Match', 'archived'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `Match.competitionId`.
    *
    * ### ️⚠️ You have not writen documentation for model Match
    *
    * Replace this default advisory JSDoc with your own documentation about model Match
    * by documenting it in your Prisma schema. For example:
    * ```prisma
    * model Match {
    *   /// Lorem ipsum dolor sit amet.
    *   competitionId  String
    * }
    * ```
    *
    * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { Match } from 'nexus-prisma'
    *
    * objectType({
    *   name: Match.$name
    *   description: Match.$description
    *   definition(t) {
    *     t.field(Match.competitionId)
    *   }
    * })
    */
  competitionId: {
    /**
     * The name of this field.
     */
    name: 'competitionId'
  
    /**
     * The type of this field.
     */
    type: 'String' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNonNullDef<'String'>
    : 'Warning/Error: The type \'String\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'String\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: undefined
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'Match', 'competitionId'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `Match.seasonId`.
    *
    * ### ️⚠️ You have not writen documentation for model Match
    *
    * Replace this default advisory JSDoc with your own documentation about model Match
    * by documenting it in your Prisma schema. For example:
    * ```prisma
    * model Match {
    *   /// Lorem ipsum dolor sit amet.
    *   seasonId  String
    * }
    * ```
    *
    * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { Match } from 'nexus-prisma'
    *
    * objectType({
    *   name: Match.$name
    *   description: Match.$description
    *   definition(t) {
    *     t.field(Match.seasonId)
    *   }
    * })
    */
  seasonId: {
    /**
     * The name of this field.
     */
    name: 'seasonId'
  
    /**
     * The type of this field.
     */
    type: 'String' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNonNullDef<'String'>
    : 'Warning/Error: The type \'String\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'String\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: undefined
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'Match', 'seasonId'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `Match.opponentId`.
    *
    * ### ️⚠️ You have not writen documentation for model Match
    *
    * Replace this default advisory JSDoc with your own documentation about model Match
    * by documenting it in your Prisma schema. For example:
    * ```prisma
    * model Match {
    *   /// Lorem ipsum dolor sit amet.
    *   opponentId  String
    * }
    * ```
    *
    * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { Match } from 'nexus-prisma'
    *
    * objectType({
    *   name: Match.$name
    *   description: Match.$description
    *   definition(t) {
    *     t.field(Match.opponentId)
    *   }
    * })
    */
  opponentId: {
    /**
     * The name of this field.
     */
    name: 'opponentId'
  
    /**
     * The type of this field.
     */
    type: 'String' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNonNullDef<'String'>
    : 'Warning/Error: The type \'String\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'String\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: undefined
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'Match', 'opponentId'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `Match.players`.
    *
    * ### ️⚠️ You have not writen documentation for model Match
    *
    * Replace this default advisory JSDoc with your own documentation about model Match
    * by documenting it in your Prisma schema. For example:
    * ```prisma
    * model Match {
    *   /// Lorem ipsum dolor sit amet.
    *   players  MatchPlayer
    * }
    * ```
    *
    * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { Match } from 'nexus-prisma'
    *
    * objectType({
    *   name: Match.$name
    *   description: Match.$description
    *   definition(t) {
    *     t.field(Match.players)
    *   }
    * })
    */
  players: {
    /**
     * The name of this field.
     */
    name: 'players'
  
    /**
     * The type of this field.
     */
    type: 'MatchPlayer' extends NexusCore.GetGen<'allNamedTypes', string>
    ? (NexusCore.NexusListDef<'MatchPlayer'> | NexusCore.NexusNonNullDef<'MatchPlayer'>)
    : 'Warning/Error: The type \'MatchPlayer\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'MatchPlayer\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: undefined
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'Match', 'players'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `Match.ratings`.
    *
    * ### ️⚠️ You have not writen documentation for model Match
    *
    * Replace this default advisory JSDoc with your own documentation about model Match
    * by documenting it in your Prisma schema. For example:
    * ```prisma
    * model Match {
    *   /// Lorem ipsum dolor sit amet.
    *   ratings  Rating
    * }
    * ```
    *
    * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { Match } from 'nexus-prisma'
    *
    * objectType({
    *   name: Match.$name
    *   description: Match.$description
    *   definition(t) {
    *     t.field(Match.ratings)
    *   }
    * })
    */
  ratings: {
    /**
     * The name of this field.
     */
    name: 'ratings'
  
    /**
     * The type of this field.
     */
    type: 'Rating' extends NexusCore.GetGen<'allNamedTypes', string>
    ? (NexusCore.NexusListDef<'Rating'> | NexusCore.NexusNonNullDef<'Rating'>)
    : 'Warning/Error: The type \'Rating\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'Rating\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: undefined
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'Match', 'ratings'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `Match.opponent`.
    *
    * ### ️⚠️ You have not writen documentation for model Match
    *
    * Replace this default advisory JSDoc with your own documentation about model Match
    * by documenting it in your Prisma schema. For example:
    * ```prisma
    * model Match {
    *   /// Lorem ipsum dolor sit amet.
    *   opponent  Club
    * }
    * ```
    *
    * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { Match } from 'nexus-prisma'
    *
    * objectType({
    *   name: Match.$name
    *   description: Match.$description
    *   definition(t) {
    *     t.field(Match.opponent)
    *   }
    * })
    */
  opponent: {
    /**
     * The name of this field.
     */
    name: 'opponent'
  
    /**
     * The type of this field.
     */
    type: 'Club' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNonNullDef<'Club'>
    : 'Warning/Error: The type \'Club\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'Club\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: undefined
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'Match', 'opponent'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `Match.competition`.
    *
    * ### ️⚠️ You have not writen documentation for model Match
    *
    * Replace this default advisory JSDoc with your own documentation about model Match
    * by documenting it in your Prisma schema. For example:
    * ```prisma
    * model Match {
    *   /// Lorem ipsum dolor sit amet.
    *   competition  Competition
    * }
    * ```
    *
    * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { Match } from 'nexus-prisma'
    *
    * objectType({
    *   name: Match.$name
    *   description: Match.$description
    *   definition(t) {
    *     t.field(Match.competition)
    *   }
    * })
    */
  competition: {
    /**
     * The name of this field.
     */
    name: 'competition'
  
    /**
     * The type of this field.
     */
    type: 'Competition' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNonNullDef<'Competition'>
    : 'Warning/Error: The type \'Competition\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'Competition\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: undefined
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'Match', 'competition'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `Match.season`.
    *
    * ### ️⚠️ You have not writen documentation for model Match
    *
    * Replace this default advisory JSDoc with your own documentation about model Match
    * by documenting it in your Prisma schema. For example:
    * ```prisma
    * model Match {
    *   /// Lorem ipsum dolor sit amet.
    *   season  Season
    * }
    * ```
    *
    * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { Match } from 'nexus-prisma'
    *
    * objectType({
    *   name: Match.$name
    *   description: Match.$description
    *   definition(t) {
    *     t.field(Match.season)
    *   }
    * })
    */
  season: {
    /**
     * The name of this field.
     */
    name: 'season'
  
    /**
     * The type of this field.
     */
    type: 'Season' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNonNullDef<'Season'>
    : 'Warning/Error: The type \'Season\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'Season\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: undefined
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'Match', 'season'>
  }
}

/**
  * Generated Nexus `objectType` configuration based on your Prisma schema's model `MatchPlayer`.
  *
  * ### ️⚠️ You have not writen documentation for model MatchPlayer
  *
  * Replace this default advisory JSDoc with your own documentation about model MatchPlayer
  * by documenting it in your Prisma schema. For example:
  *
  * ```prisma
  * /// Lorem ipsum dolor sit amet...
  * model MatchPlayer {
  *   foo  String
  * }
  * ```
  *
  * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
  *
  * @example
  *
  * import { objectType } from 'nexus'
  * import { MatchPlayer } from 'nexus-prisma'
  *
  * objectType({
  *   name: MatchPlayer.$name
  *   description: MatchPlayer.$description
  *   definition(t) {
  *     t.field(MatchPlayer.id)
  *   }
  * })
  */
export interface MatchPlayer {
  $name: 'MatchPlayer'
  $description: undefined
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `MatchPlayer.id`.
    *
    * ### ️⚠️ You have not writen documentation for model MatchPlayer
    *
    * Replace this default advisory JSDoc with your own documentation about model MatchPlayer
    * by documenting it in your Prisma schema. For example:
    * ```prisma
    * model MatchPlayer {
    *   /// Lorem ipsum dolor sit amet.
    *   id  String
    * }
    * ```
    *
    * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { MatchPlayer } from 'nexus-prisma'
    *
    * objectType({
    *   name: MatchPlayer.$name
    *   description: MatchPlayer.$description
    *   definition(t) {
    *     t.field(MatchPlayer.id)
    *   }
    * })
    */
  id: {
    /**
     * The name of this field.
     */
    name: 'id'
  
    /**
     * The type of this field.
     */
    type: 'ID' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNonNullDef<'ID'>
    : 'Warning/Error: The type \'ID\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'ID\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: undefined
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'MatchPlayer', 'id'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `MatchPlayer.playerId`.
    *
    * ### ️⚠️ You have not writen documentation for model MatchPlayer
    *
    * Replace this default advisory JSDoc with your own documentation about model MatchPlayer
    * by documenting it in your Prisma schema. For example:
    * ```prisma
    * model MatchPlayer {
    *   /// Lorem ipsum dolor sit amet.
    *   playerId  String
    * }
    * ```
    *
    * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { MatchPlayer } from 'nexus-prisma'
    *
    * objectType({
    *   name: MatchPlayer.$name
    *   description: MatchPlayer.$description
    *   definition(t) {
    *     t.field(MatchPlayer.playerId)
    *   }
    * })
    */
  playerId: {
    /**
     * The name of this field.
     */
    name: 'playerId'
  
    /**
     * The type of this field.
     */
    type: 'String' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNonNullDef<'String'>
    : 'Warning/Error: The type \'String\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'String\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: undefined
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'MatchPlayer', 'playerId'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `MatchPlayer.matchId`.
    *
    * ### ️⚠️ You have not writen documentation for model MatchPlayer
    *
    * Replace this default advisory JSDoc with your own documentation about model MatchPlayer
    * by documenting it in your Prisma schema. For example:
    * ```prisma
    * model MatchPlayer {
    *   /// Lorem ipsum dolor sit amet.
    *   matchId  String
    * }
    * ```
    *
    * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { MatchPlayer } from 'nexus-prisma'
    *
    * objectType({
    *   name: MatchPlayer.$name
    *   description: MatchPlayer.$description
    *   definition(t) {
    *     t.field(MatchPlayer.matchId)
    *   }
    * })
    */
  matchId: {
    /**
     * The name of this field.
     */
    name: 'matchId'
  
    /**
     * The type of this field.
     */
    type: 'String' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNonNullDef<'String'>
    : 'Warning/Error: The type \'String\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'String\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: undefined
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'MatchPlayer', 'matchId'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `MatchPlayer.match`.
    *
    * ### ️⚠️ You have not writen documentation for model MatchPlayer
    *
    * Replace this default advisory JSDoc with your own documentation about model MatchPlayer
    * by documenting it in your Prisma schema. For example:
    * ```prisma
    * model MatchPlayer {
    *   /// Lorem ipsum dolor sit amet.
    *   match  Match
    * }
    * ```
    *
    * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { MatchPlayer } from 'nexus-prisma'
    *
    * objectType({
    *   name: MatchPlayer.$name
    *   description: MatchPlayer.$description
    *   definition(t) {
    *     t.field(MatchPlayer.match)
    *   }
    * })
    */
  match: {
    /**
     * The name of this field.
     */
    name: 'match'
  
    /**
     * The type of this field.
     */
    type: 'Match' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNonNullDef<'Match'>
    : 'Warning/Error: The type \'Match\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'Match\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: undefined
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'MatchPlayer', 'match'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `MatchPlayer.player`.
    *
    * ### ️⚠️ You have not writen documentation for model MatchPlayer
    *
    * Replace this default advisory JSDoc with your own documentation about model MatchPlayer
    * by documenting it in your Prisma schema. For example:
    * ```prisma
    * model MatchPlayer {
    *   /// Lorem ipsum dolor sit amet.
    *   player  Player
    * }
    * ```
    *
    * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { MatchPlayer } from 'nexus-prisma'
    *
    * objectType({
    *   name: MatchPlayer.$name
    *   description: MatchPlayer.$description
    *   definition(t) {
    *     t.field(MatchPlayer.player)
    *   }
    * })
    */
  player: {
    /**
     * The name of this field.
     */
    name: 'player'
  
    /**
     * The type of this field.
     */
    type: 'Player' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNonNullDef<'Player'>
    : 'Warning/Error: The type \'Player\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'Player\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: undefined
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'MatchPlayer', 'player'>
  }
}

/**
  * Generated Nexus `objectType` configuration based on your Prisma schema's model `SeasonPlayer`.
  *
  * ### ️⚠️ You have not writen documentation for model SeasonPlayer
  *
  * Replace this default advisory JSDoc with your own documentation about model SeasonPlayer
  * by documenting it in your Prisma schema. For example:
  *
  * ```prisma
  * /// Lorem ipsum dolor sit amet...
  * model SeasonPlayer {
  *   foo  String
  * }
  * ```
  *
  * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
  *
  * @example
  *
  * import { objectType } from 'nexus'
  * import { SeasonPlayer } from 'nexus-prisma'
  *
  * objectType({
  *   name: SeasonPlayer.$name
  *   description: SeasonPlayer.$description
  *   definition(t) {
  *     t.field(SeasonPlayer.id)
  *   }
  * })
  */
export interface SeasonPlayer {
  $name: 'SeasonPlayer'
  $description: undefined
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `SeasonPlayer.id`.
    *
    * ### ️⚠️ You have not writen documentation for model SeasonPlayer
    *
    * Replace this default advisory JSDoc with your own documentation about model SeasonPlayer
    * by documenting it in your Prisma schema. For example:
    * ```prisma
    * model SeasonPlayer {
    *   /// Lorem ipsum dolor sit amet.
    *   id  String
    * }
    * ```
    *
    * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { SeasonPlayer } from 'nexus-prisma'
    *
    * objectType({
    *   name: SeasonPlayer.$name
    *   description: SeasonPlayer.$description
    *   definition(t) {
    *     t.field(SeasonPlayer.id)
    *   }
    * })
    */
  id: {
    /**
     * The name of this field.
     */
    name: 'id'
  
    /**
     * The type of this field.
     */
    type: 'ID' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNonNullDef<'ID'>
    : 'Warning/Error: The type \'ID\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'ID\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: undefined
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'SeasonPlayer', 'id'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `SeasonPlayer.playerId`.
    *
    * ### ️⚠️ You have not writen documentation for model SeasonPlayer
    *
    * Replace this default advisory JSDoc with your own documentation about model SeasonPlayer
    * by documenting it in your Prisma schema. For example:
    * ```prisma
    * model SeasonPlayer {
    *   /// Lorem ipsum dolor sit amet.
    *   playerId  String
    * }
    * ```
    *
    * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { SeasonPlayer } from 'nexus-prisma'
    *
    * objectType({
    *   name: SeasonPlayer.$name
    *   description: SeasonPlayer.$description
    *   definition(t) {
    *     t.field(SeasonPlayer.playerId)
    *   }
    * })
    */
  playerId: {
    /**
     * The name of this field.
     */
    name: 'playerId'
  
    /**
     * The type of this field.
     */
    type: 'String' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNonNullDef<'String'>
    : 'Warning/Error: The type \'String\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'String\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: undefined
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'SeasonPlayer', 'playerId'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `SeasonPlayer.seasonId`.
    *
    * ### ️⚠️ You have not writen documentation for model SeasonPlayer
    *
    * Replace this default advisory JSDoc with your own documentation about model SeasonPlayer
    * by documenting it in your Prisma schema. For example:
    * ```prisma
    * model SeasonPlayer {
    *   /// Lorem ipsum dolor sit amet.
    *   seasonId  String
    * }
    * ```
    *
    * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { SeasonPlayer } from 'nexus-prisma'
    *
    * objectType({
    *   name: SeasonPlayer.$name
    *   description: SeasonPlayer.$description
    *   definition(t) {
    *     t.field(SeasonPlayer.seasonId)
    *   }
    * })
    */
  seasonId: {
    /**
     * The name of this field.
     */
    name: 'seasonId'
  
    /**
     * The type of this field.
     */
    type: 'String' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNonNullDef<'String'>
    : 'Warning/Error: The type \'String\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'String\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: undefined
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'SeasonPlayer', 'seasonId'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `SeasonPlayer.player`.
    *
    * ### ️⚠️ You have not writen documentation for model SeasonPlayer
    *
    * Replace this default advisory JSDoc with your own documentation about model SeasonPlayer
    * by documenting it in your Prisma schema. For example:
    * ```prisma
    * model SeasonPlayer {
    *   /// Lorem ipsum dolor sit amet.
    *   player  Player
    * }
    * ```
    *
    * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { SeasonPlayer } from 'nexus-prisma'
    *
    * objectType({
    *   name: SeasonPlayer.$name
    *   description: SeasonPlayer.$description
    *   definition(t) {
    *     t.field(SeasonPlayer.player)
    *   }
    * })
    */
  player: {
    /**
     * The name of this field.
     */
    name: 'player'
  
    /**
     * The type of this field.
     */
    type: 'Player' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNonNullDef<'Player'>
    : 'Warning/Error: The type \'Player\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'Player\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: undefined
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'SeasonPlayer', 'player'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `SeasonPlayer.season`.
    *
    * ### ️⚠️ You have not writen documentation for model SeasonPlayer
    *
    * Replace this default advisory JSDoc with your own documentation about model SeasonPlayer
    * by documenting it in your Prisma schema. For example:
    * ```prisma
    * model SeasonPlayer {
    *   /// Lorem ipsum dolor sit amet.
    *   season  Season
    * }
    * ```
    *
    * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { SeasonPlayer } from 'nexus-prisma'
    *
    * objectType({
    *   name: SeasonPlayer.$name
    *   description: SeasonPlayer.$description
    *   definition(t) {
    *     t.field(SeasonPlayer.season)
    *   }
    * })
    */
  season: {
    /**
     * The name of this field.
     */
    name: 'season'
  
    /**
     * The type of this field.
     */
    type: 'Season' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNonNullDef<'Season'>
    : 'Warning/Error: The type \'Season\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'Season\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: undefined
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'SeasonPlayer', 'season'>
  }
}

/**
  * Generated Nexus `objectType` configuration based on your Prisma schema's model `Rating`.
  *
  * ### ️⚠️ You have not writen documentation for model Rating
  *
  * Replace this default advisory JSDoc with your own documentation about model Rating
  * by documenting it in your Prisma schema. For example:
  *
  * ```prisma
  * /// Lorem ipsum dolor sit amet...
  * model Rating {
  *   foo  String
  * }
  * ```
  *
  * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
  *
  * @example
  *
  * import { objectType } from 'nexus'
  * import { Rating } from 'nexus-prisma'
  *
  * objectType({
  *   name: Rating.$name
  *   description: Rating.$description
  *   definition(t) {
  *     t.field(Rating.id)
  *   }
  * })
  */
export interface Rating {
  $name: 'Rating'
  $description: undefined
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `Rating.id`.
    *
    * ### ️⚠️ You have not writen documentation for model Rating
    *
    * Replace this default advisory JSDoc with your own documentation about model Rating
    * by documenting it in your Prisma schema. For example:
    * ```prisma
    * model Rating {
    *   /// Lorem ipsum dolor sit amet.
    *   id  String
    * }
    * ```
    *
    * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { Rating } from 'nexus-prisma'
    *
    * objectType({
    *   name: Rating.$name
    *   description: Rating.$description
    *   definition(t) {
    *     t.field(Rating.id)
    *   }
    * })
    */
  id: {
    /**
     * The name of this field.
     */
    name: 'id'
  
    /**
     * The type of this field.
     */
    type: 'ID' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNonNullDef<'ID'>
    : 'Warning/Error: The type \'ID\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'ID\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: undefined
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'Rating', 'id'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `Rating.userId`.
    *
    * ### ️⚠️ You have not writen documentation for model Rating
    *
    * Replace this default advisory JSDoc with your own documentation about model Rating
    * by documenting it in your Prisma schema. For example:
    * ```prisma
    * model Rating {
    *   /// Lorem ipsum dolor sit amet.
    *   userId  String
    * }
    * ```
    *
    * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { Rating } from 'nexus-prisma'
    *
    * objectType({
    *   name: Rating.$name
    *   description: Rating.$description
    *   definition(t) {
    *     t.field(Rating.userId)
    *   }
    * })
    */
  userId: {
    /**
     * The name of this field.
     */
    name: 'userId'
  
    /**
     * The type of this field.
     */
    type: 'String' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNonNullDef<'String'>
    : 'Warning/Error: The type \'String\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'String\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: undefined
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'Rating', 'userId'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `Rating.matchId`.
    *
    * ### ️⚠️ You have not writen documentation for model Rating
    *
    * Replace this default advisory JSDoc with your own documentation about model Rating
    * by documenting it in your Prisma schema. For example:
    * ```prisma
    * model Rating {
    *   /// Lorem ipsum dolor sit amet.
    *   matchId  String
    * }
    * ```
    *
    * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { Rating } from 'nexus-prisma'
    *
    * objectType({
    *   name: Rating.$name
    *   description: Rating.$description
    *   definition(t) {
    *     t.field(Rating.matchId)
    *   }
    * })
    */
  matchId: {
    /**
     * The name of this field.
     */
    name: 'matchId'
  
    /**
     * The type of this field.
     */
    type: 'String' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNonNullDef<'String'>
    : 'Warning/Error: The type \'String\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'String\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: undefined
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'Rating', 'matchId'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `Rating.playerId`.
    *
    * ### ️⚠️ You have not writen documentation for model Rating
    *
    * Replace this default advisory JSDoc with your own documentation about model Rating
    * by documenting it in your Prisma schema. For example:
    * ```prisma
    * model Rating {
    *   /// Lorem ipsum dolor sit amet.
    *   playerId  String
    * }
    * ```
    *
    * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { Rating } from 'nexus-prisma'
    *
    * objectType({
    *   name: Rating.$name
    *   description: Rating.$description
    *   definition(t) {
    *     t.field(Rating.playerId)
    *   }
    * })
    */
  playerId: {
    /**
     * The name of this field.
     */
    name: 'playerId'
  
    /**
     * The type of this field.
     */
    type: 'String' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNonNullDef<'String'>
    : 'Warning/Error: The type \'String\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'String\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: undefined
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'Rating', 'playerId'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `Rating.rating`.
    *
    * ### ️⚠️ You have not writen documentation for model Rating
    *
    * Replace this default advisory JSDoc with your own documentation about model Rating
    * by documenting it in your Prisma schema. For example:
    * ```prisma
    * model Rating {
    *   /// Lorem ipsum dolor sit amet.
    *   rating  Float
    * }
    * ```
    *
    * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { Rating } from 'nexus-prisma'
    *
    * objectType({
    *   name: Rating.$name
    *   description: Rating.$description
    *   definition(t) {
    *     t.field(Rating.rating)
    *   }
    * })
    */
  rating: {
    /**
     * The name of this field.
     */
    name: 'rating'
  
    /**
     * The type of this field.
     */
    type: 'Float' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNonNullDef<'Float'>
    : 'Warning/Error: The type \'Float\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'Float\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: undefined
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'Rating', 'rating'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `Rating.match`.
    *
    * ### ️⚠️ You have not writen documentation for model Rating
    *
    * Replace this default advisory JSDoc with your own documentation about model Rating
    * by documenting it in your Prisma schema. For example:
    * ```prisma
    * model Rating {
    *   /// Lorem ipsum dolor sit amet.
    *   match  Match
    * }
    * ```
    *
    * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { Rating } from 'nexus-prisma'
    *
    * objectType({
    *   name: Rating.$name
    *   description: Rating.$description
    *   definition(t) {
    *     t.field(Rating.match)
    *   }
    * })
    */
  match: {
    /**
     * The name of this field.
     */
    name: 'match'
  
    /**
     * The type of this field.
     */
    type: 'Match' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNonNullDef<'Match'>
    : 'Warning/Error: The type \'Match\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'Match\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: undefined
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'Rating', 'match'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `Rating.player`.
    *
    * ### ️⚠️ You have not writen documentation for model Rating
    *
    * Replace this default advisory JSDoc with your own documentation about model Rating
    * by documenting it in your Prisma schema. For example:
    * ```prisma
    * model Rating {
    *   /// Lorem ipsum dolor sit amet.
    *   player  Player
    * }
    * ```
    *
    * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { Rating } from 'nexus-prisma'
    *
    * objectType({
    *   name: Rating.$name
    *   description: Rating.$description
    *   definition(t) {
    *     t.field(Rating.player)
    *   }
    * })
    */
  player: {
    /**
     * The name of this field.
     */
    name: 'player'
  
    /**
     * The type of this field.
     */
    type: 'Player' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNonNullDef<'Player'>
    : 'Warning/Error: The type \'Player\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'Player\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: undefined
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'Rating', 'player'>
  }
  /**
    * Generated Nexus `t.field` configuration based on your Prisma schema's model-field `Rating.user`.
    *
    * ### ️⚠️ You have not writen documentation for model Rating
    *
    * Replace this default advisory JSDoc with your own documentation about model Rating
    * by documenting it in your Prisma schema. For example:
    * ```prisma
    * model Rating {
    *   /// Lorem ipsum dolor sit amet.
    *   user  User
    * }
    * ```
    *
    * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
    *
    * @example
    *
    * import { objectType } from 'nexus'
    * import { Rating } from 'nexus-prisma'
    *
    * objectType({
    *   name: Rating.$name
    *   description: Rating.$description
    *   definition(t) {
    *     t.field(Rating.user)
    *   }
    * })
    */
  user: {
    /**
     * The name of this field.
     */
    name: 'user'
  
    /**
     * The type of this field.
     */
    type: 'User' extends NexusCore.GetGen<'allNamedTypes', string>
    ? NexusCore.NexusNonNullDef<'User'>
    : 'Warning/Error: The type \'User\' is not amoung the union of GetGen<\'allNamedTypes\', string>. This means that either: 1) You need to run nexus typegen reflection. 2) You need to add the type \'User\' to your GraphQL API.'
  
    /**
     * The documentation of this field.
     */
    description: undefined
  
    /**
     * The resolver of this field
     */
    resolve: NexusCore.FieldResolver<'Rating', 'user'>
  }
}

// Enums

/**
  * Generated Nexus `enumType` configuration based on your Prisma schema's enum `Role`.
  *
  * ### ️⚠️ You have not writen documentation for enum Role
  *
  * Replace this default advisory JSDoc with your own documentation about enum Role
  * by documenting it in your Prisma schema. For example:
  *
  * ```prisma
  * /// Lorem ipsum dolor sit amet...
  * enum Role {
  *   USER
  *   ADMIN
  * }
  * ```
  *
  * Learn more about documentation comments in Prisma schema files [here](https://www.prisma.io/docs/concepts/components/prisma-schema#comments).
  *
  * Contains these members: USER, ADMIN
  *
  * @example
  *
  * import { enumType } from 'nexus'
  * import { Role } from 'nexus-prisma'
  *
  * enumType(Role)
  */
export interface Role {
  name: 'Role'
  description: undefined
  members: ['USER', 'ADMIN']
}


//
//
// TERMS
// TERMS
// TERMS
// TERMS
//
//

//
//
// EXPORTS: PRISMA MODELS
// EXPORTS: PRISMA MODELS
// EXPORTS: PRISMA MODELS
// EXPORTS: PRISMA MODELS
//
//

export const Account: Account

export const Session: Session

export const User: User

export const VerificationToken: VerificationToken

export const Player: Player

export const Club: Club

export const Season: Season

export const Competition: Competition

export const Match: Match

export const MatchPlayer: MatchPlayer

export const SeasonPlayer: SeasonPlayer

export const Rating: Rating

//
//
// EXPORTS: PRISMA ENUMS
// EXPORTS: PRISMA ENUMS
// EXPORTS: PRISMA ENUMS
// EXPORTS: PRISMA ENUMS
//
//

export const Role: Role

//
//
// EXPORTS: OTHER
// EXPORTS: OTHER
// EXPORTS: OTHER
// EXPORTS: OTHER
//
//

import { Runtime } from 'nexus-prisma/dist-cjs/generator/runtime/settingsSingleton'

/**
 * Adjust Nexus Prisma's [runtime settings](https://pris.ly/nexus-prisma/docs/settings/runtime).
 *
 * @example
 *
 *     import { PrismaClient } from '@prisma/client'
 *     import { ApolloServer } from 'apollo-server'
 *     import { makeSchema } from 'nexus'
 *     import { User, Post, $settings } from 'nexus-prisma'
 *
 *     new ApolloServer({
 *       schema: makeSchema({
 *         types: [],
 *       }),
 *       context() {
 *         return {
 *           db: new PrismaClient(), // <-- You put Prisma client on the "db" context property
 *         }
 *       },
 *     })
 *
 *     $settings({
 *       prismaClientContextField: 'db', // <-- Tell Nexus Prisma
 *     })
 *
 * @remarks This is _different_ than Nexus Prisma's [_gentime_ settings](https://pris.ly/nexus-prisma/docs/settings/gentime).
 */
export const $settings: typeof Runtime.changeSettings
