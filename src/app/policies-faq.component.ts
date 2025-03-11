import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-policies-faq',
  templateUrl: './policies-faq.component.html',
  styleUrls: ['./policies-faq.component.scss']
})
export class PoliciesFaqComponent implements OnInit {
  activeSection: string = 'policies';

  // Policy items data
  policyItems = [
    {
      title: 'Membership Policy',
      content: 'The Block Rosary Movement welcomes all individuals who share our devotion to Mama Mary. Membership is open to Catholics of all ages who commit to participate in regular prayer meetings and activities.',
      list: [
        'Members must register with their local Block Rosary chapter',
        'Annual membership renewal is encouraged to maintain active status',
        'Members are expected to participate in at least one Block Rosary activity per month'
      ]
    },
    {
      title: 'Prayer Group Formation',
      content: 'Block Rosary prayer groups are formed within neighborhoods to facilitate regular gatherings for prayer and devotion.',
      list: [
        'A minimum of 5 households is required to form a new Block Rosary group',
        'Each group must designate a coordinator who will liaise with the parish coordinator',
        'Groups are encouraged to meet at least once a week for communal prayer',
        'Rotation of hosting responsibilities among member households is recommended'
      ]
    },
    {
      title: 'Event Organization',
      content: 'The Block Rosary Movement organizes various religious events throughout the year to strengthen faith and community bonds.',
      list: [
        'All events must be approved by the parish coordinator and aligned with Catholic teachings',
        'Event proposals should be submitted at least one month in advance',
        'Organizers must ensure proper permits are secured for public gatherings',
        'Safety protocols must be followed during all events'
      ]
    },
    {
      title: 'Financial Transparency',
      content: 'As a non-government organization, the Block Rosary Movement is committed to financial transparency and accountability.',
      list: [
        'All donations and contributions are recorded and reported quarterly',
        'Financial statements are available for review by members upon request',
        'Funds are primarily used for religious materials, event organization, and community outreach',
        'An annual financial report is presented during the general assembly'
      ]
    },
    {
      title: 'Code of Conduct',
      content: 'Members of the Block Rosary Movement are expected to uphold Christian values in all interactions and activities.',
      list: [
        'Treat all members with respect, dignity, and compassion',
        'Maintain reverence during prayer meetings and religious activities',
        'Refrain from using the organization for personal gain or political purposes',
        'Uphold the teachings of the Catholic Church in personal conduct'
      ]
    }
  ];

  // FAQ items data
  faqItems = [
    {
      question: 'What is the Block Rosary Movement?',
      answer: 'The Block Rosary Movement is a non-government organization dedicated to promoting devotion to Mama Mary through prayers, religious gatherings, and religious activities. Our primary focus is to bring together communities in prayer, particularly through the recitation of the Holy Rosary in neighborhood settings.',
      isOpen: false
    },
    {
      question: 'How can I join the Block Rosary Movement?',
      answer: 'Joining the Block Rosary Movement is simple. You can contact your parish office, attend a local meeting, register through our website, or start a new group. There are no membership fees, but voluntary donations are welcome.',
      listType: 'ol',
      list: [
        'Contact your parish office to inquire about existing Block Rosary groups in your area',
        'Attend a local Block Rosary prayer meeting and express your interest to the coordinator',
        'Register through our website by filling out the membership form',
        'Start a new Block Rosary group in your neighborhood if none exists'
      ],
      additionalText: 'There are no membership fees, but voluntary donations are welcome to support our activities.',
      isOpen: false
    },
    {
      question: 'What happens during a Block Rosary meeting?',
      answer: 'A typical Block Rosary meeting includes:',
      listType: 'ul',
      list: [
        'Opening prayers',
        'Recitation of the Holy Rosary',
        'Reading and reflection on Scripture or Marian devotions',
        'Sharing of prayer intentions',
        'Community announcements',
        'Closing prayers',
        'Fellowship (often including simple refreshments)'
      ],
      additionalText: 'Meetings usually last between 60-90 minutes, depending on the group.',
      isOpen: false
    },
    {
      question: 'How often do Block Rosary groups meet?',
      answer: 'Most Block Rosary groups meet weekly, often on a fixed day of the week. However, the frequency can vary based on the availability and preference of the members. Some groups meet more frequently during special occasions like Marian months (May and October) or less frequently during challenging seasons. The important aspect is consistency and commitment to regular prayer.',
      isOpen: false
    },
    {
      question: 'Can children participate in the Block Rosary Movement?',
      answer: 'Absolutely! Children are not only welcome but encouraged to participate in the Block Rosary Movement. We believe in nurturing devotion to Mama Mary from a young age. Many groups have special roles for children, such as leading certain prayers or bringing flowers to the image of Mary. Family participation strengthens both faith and family bonds.',
      isOpen: false
    },
    {
      question: 'What materials do I need for Block Rosary meetings?',
      answer: 'Basic materials for Block Rosary meetings include:',
      listType: 'ul',
      list: [
        'Rosary beads for each participant',
        'An image or statue of the Blessed Virgin Mary',
        'Candles (optional)',
        'Prayer guides or booklets',
        'Bible'
      ],
      additionalText: 'The Block Rosary Movement can provide starter kits for new groups upon request.',
      isOpen: false
    },
    {
      question: 'How can I start a Block Rosary group in my neighborhood?',
      answer: 'To start a new Block Rosary group:',
      listType: 'ol',
      list: [
        'Contact your parish priest for approval and guidance',
        'Invite neighbors and friends who might be interested (aim for at least 5 households)',
        'Register your group with the Block Rosary Movement through your parish coordinator',
        'Establish a regular meeting schedule and location rotation system',
        'Request starter materials from the organization if needed'
      ],
      additionalText: 'Our coordinators are available to help you establish and grow your new group.',
      isOpen: false
    },
    {
      question: 'Does the Block Rosary Movement organize other activities besides prayer meetings?',
      answer: 'Yes, the Block Rosary Movement organizes various activities throughout the year, including:',
      listType: 'ul',
      list: [
        'Marian processions and pilgrimages'
      ],
      isOpen: false
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  // Method to change active section
  showSection(sectionId: string): void {
    this.activeSection = sectionId;
  }

  // Method to toggle FAQ answers
  toggleAnswer(index: number): void {
    this.faqItems[index].isOpen = !this.faqItems[index].isOpen;
  }

  // Method to check if section is active
  isSectionActive(sectionId: string): boolean {
    return this.activeSection === sectionId;
  }
}
