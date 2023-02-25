enum CivilState {
  doNotInform = 'doNotInform',
  married = 'married',
  single = 'single',
  divorced = 'divorced'
}

export interface Curriculum {
  views: number
  searchable: boolean
  civil_state: keyof typeof CivilState
}

// views Int @default(0)
// searchable Boolean @default(true)
// civil_state String
// availability String
// occupation String
// presentation String
// phone String
// public_email String
// contact_preference String
// first_name String
// last_name String
// is_pcd Boolean @default(false)