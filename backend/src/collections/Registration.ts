import { CollectionConfig } from 'payload/types';

const Registration: CollectionConfig = {
  slug: 'registration',
  access: {
    create: () => true,
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'school',
      type: 'text',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'Waiting',
      options: [
        { label: 'Waiting', value: 'Waiting' },
        { label: 'Rejected', value: 'Rejected' },
        { label: 'Accepted', value: 'Accepted' },
      ],
    },
    {
      name: 'registrationDate',
      type: 'date',
      required: true,
    },
  ],
};

export default Registration;