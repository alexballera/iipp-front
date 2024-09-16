import { AbilityBuilder, Ability } from '@casl/ability'
import { AccionesEnum } from '../enums'
import { UserDataType } from '../types/user'

export type Subjects = string
export type Actions = keyof typeof AccionesEnum

export type AppAbility = Ability<[Actions, Subjects]> | undefined

export const AppAbility = Ability as any

export type ACLObj = {
  action: Actions
  subject: string
}

const defineRulesFor = (user: UserDataType | null) => {
  const { can, rules } = new AbilityBuilder(AppAbility)

  // const isAdmin = user?.role?.policies.find(policy =>
  //   policy.views?.find(view => view.entrypoint === '*')
  // )

  // if (isAdmin) {
  //   Subjects.forEach(item =>
  //     item.views.forEach(view =>
  //       view.actions.forEach(item => {
  //         can(item, view.entrypoint)
  //       })
  //     )
  //   )
  // }

  user?.role?.policies.forEach(policy => {
    const { views, effect } = policy

    if (effect === 'allow') {
      views?.forEach(view => {
        if (view.entrypoint === '*') return
        view.actions.forEach(item => can(item, view.entrypoint.replace(/\/$/, '')))
      })
    }
  })

  return rules
}

export const buildAbilityFor = (user: UserDataType | null): AppAbility => {
  return new AppAbility(defineRulesFor(user))
}

export const defaultACLObj: ACLObj = {
  action: 'CREAR',
  subject: 'acl-page'
}

export default defineRulesFor
