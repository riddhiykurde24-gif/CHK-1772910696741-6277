const natural = require('natural');
const axios = require('axios');
const QueryTracker = require('../models/QueryTracker');

class ResponseEngine {
  static responses = {
    'admission': {
      text: `📝 **Admission Process 2024-25:**

**Important Dates:**
• Application Start: January 15, 2024
• Application Deadline: April 30, 2024
• Entrance Exam: May 10-15, 2024
• Counseling: May 20-30, 2024
• Classes Begin: July 15, 2024

**Eligibility Criteria:**
• UG Programs: 10+2 with 60% (55% for reserved)
• PG Programs: Graduation with 55% (50% for reserved)
• Ph.D.: Master's degree with 60%

**Application Process:**
1. Online Registration
2. Document Upload
3. Application Fee Payment (₹500)
4. Entrance Exam Registration
5. Counseling Registration

**Required Documents:**
• 10th & 12th Marksheets
• Transfer Certificate
• Migration Certificate
• Category Certificate (if applicable)
• Passport Size Photo
• ID Proof

For specific course requirements, mention the program name.`,
      category: 'admission',
      suggestions: ['fee structure', 'courses offered', 'scholarship']
    },

    'fee|fees|payment': {
      text: `💰 **Fee Structure 2024-25:**

**Tuition Fees (Per Semester):**
• B.Tech: ₹37,500
• BBA: ₹30,000
• B.Com: ₹25,000
• B.Sc: ₹27,500
• BA: ₹22,500
• M.Tech: ₹45,000
• MBA: ₹42,500
• M.Com: ₹32,500
• M.Sc: ₹35,000

**Additional Fees:**
• Registration: ₹1,000 (one-time)
• Library: ₹1,000/semester
• Laboratory: ₹1,500/semester
• Sports: ₹750/semester
• Examination: ₹2,000/semester

**Hostel Fees:**
• Boys Hostel: ₹15,000/semester
• Girls Hostel: ₹16,000/semester
• Mess Advance: ₹15,000/semester

**Payment Methods:**
• Online: Net Banking, UPI, Cards
• Offline: Bank Challan, DD
• EMI Options Available

**Scholarships available based on merit and need.**`,
      category: 'fee',
      suggestions: ['scholarship', 'hostel', 'payment deadline']
    },

    'exam|schedule|result': {
      text: `📋 **Examination Schedule 2024:**

**Mid-Semester Exams:**
• Date: April 10-15, 2024
• Time: 10:00 AM - 1:00 PM
• Pattern: Objective + Subjective

**End-Semester Exams:**
• Theory: May 20-30, 2024
• Practicals: May 15-19, 2024
• Time: 10:00 AM - 1:00 PM

**Result Declaration:**
• UG Results: June 15, 2024
• PG Results: June 20, 2024
• Revaluation: June 25-30, 2024

**Backlog Exams:**
• Application: July 1-5, 2024
• Exams: July 15-20, 2024

**Important Guidelines:**
• Admit Card: Download 1 week before
• Hall Ticket: Mandatory for exam
• Minimum 75% attendance required
• No electronic devices allowed

Check results on: results.university.edu.in`,
      category: 'exam',
      suggestions: ['grading system', 'attendance', 'revaluation']
    },

    'hostel|accommodation': {
      text: `🏠 **Hostel Facilities:**

**Boys Hostel (2 blocks):**
• Capacity: 500 students
• Rooms: 250 (2-sharing)
• Amenities: Wi-Fi, Study room
• Fee: ₹15,000/semester

**Girls Hostel (3 blocks):**
• Capacity: 600 students
• Rooms: 300 (2/3-sharing)
• Amenities: Wi-Fi, Common room
• Fee: ₹16,000/semester

**Facilities:**
• 24/7 Wi-Fi
• RO Water Purifier
• Common Room with TV
• Indoor Games
• Gymnasium
• Laundry Service
• 24/7 Security
• CCTV Surveillance
• Visitor Room
• Medical Room

**Mess:**
• Vegetarian & Non-vegetarian
• Breakfast: 7:30-9:00 AM
• Lunch: 12:30-2:00 PM
• Dinner: 7:30-9:00 PM
• Monthly Mess: ₹2,500

**Application Process:**
• Apply within 15 days of admission
• Preference to outstation students
• Allotment on first-come basis`,
      category: 'hostel',
      suggestions: ['mess menu', 'hostel rules', 'hostel fee']
    },

    'scholarship|financial aid': {
      text: `🎯 **Scholarship Opportunities 2024:**

**Merit-Based Scholarships:**
• University Topper: 100% tuition waiver
• Top 5 Students: 75% waiver
• Top 10 Students: 50% waiver
• Top 20 Students: 25% waiver

**Need-Based Scholarships:**
• Income < ₹1 Lakh: 100% waiver
• Income ₹1-2 Lakhs: 50% waiver
• Income ₹2-3 Lakhs: 25% waiver

**Category Scholarships:**
• SC/ST: Full tuition + Stipend
• OBC: 50% tuition waiver
• Minorities: Various schemes

**Sports Quota:**
• National Level: 75% waiver
• State Level: 50% waiver
• University Level: 25% waiver

**Special Scholarships:**
• Girl Students: 10% additional
• Single Girl Child: 20% additional
• Differently Abled: 50% waiver
• Defense Personnel: 30% waiver

**Application Deadline: May 1, 2024**

**Required Documents:**
• Income Certificate
• Caste Certificate (if applicable)
• Previous Year Marksheets
• Sports/Achievement Proof`,
      category: 'scholarship',
      suggestions: ['fee structure', 'documents required', 'application form']
    },

    'placement|job|career': {
      text: `💼 **Placement Statistics 2023-24:**

**Overall Performance:**
• Total Students Placed: 850+
• Placement Percentage: 92%
• Highest Package: ₹25 LPA
• Average Package: ₹8.5 LPA
• Median Package: ₹7.2 LPA

**Top Recruiters:**
1. TCS: 85 offers | ₹6-8 LPA
2. Infosys: 72 offers | ₹6.5-7.5 LPA
3. Wipro: 68 offers | ₹6-7 LPA
4. Accenture: 55 offers | ₹7-8 LPA
5. Deloitte: 42 offers | ₹9-12 LPA
6. Amazon: 35 offers | ₹15-20 LPA
7. Microsoft: 28 offers | ₹20-25 LPA
8. Google: 15 offers | ₹22-28 LPA

**Internship Statistics:**
• Students with Internships: 80%
• Average Stipend: ₹25,000/month
• Pre-Placement Offers: 45%

**Placement Process:**
1. Registration (July-Aug)
2. Pre-Placement Talks
3. Aptitude Test
4. Group Discussion
5. Technical Interview
6. HR Interview

**Training Programs:**
• Aptitude Training
• Communication Skills
• Technical Workshops
• Mock Interviews
• Resume Building

**Next Placement Drive: July 2024**`,
      category: 'placement',
      suggestions: ['training programs', 'company list', 'internship']
    },

    'library|books': {
      text: `📚 **Library Information:**

**Library Timings:**
• Monday-Friday: 8:00 AM - 10:00 PM
• Saturday: 9:00 AM - 6:00 PM
• Sunday: 10:00 AM - 4:00 PM
• Holidays: 10:00 AM - 2:00 PM

**Collection:**
• Books: 75,000+ volumes
• E-Books: 25,000+ titles
• Journals: 300+ (National/International)
• Magazines: 50+
• Newspapers: 15+
• Thesis/Dissertations: 3,000+
• CDs/DVDs: 1,000+

**Digital Resources:**
• IEEE Xplore
• SpringerLink
• JStor
• ScienceDirect
• ProQuest
• DELNET

**Borrowing Rules:**
• UG Students: 5 books for 15 days
• PG Students: 7 books for 20 days
• Research Scholars: 10 books for 30 days
• Faculty: 15 books for 60 days
• Late Fee: ₹5/day per book

**Services:**
• Online Catalogue (OPAC)
• Book Reservation
• Inter-Library Loan
• Photocopying
• Reference Service
• Digital Library Access`,
      category: 'library',
      suggestions: ['library membership', 'digital library', 'book renewal']
    },

    'faculty|teacher|professor': {
      text: `👨‍🏫 **Faculty Information:**

**Faculty Statistics:**
• Total Faculty: 180+
• Ph.D. Holders: 145 (80%)
• Industry Experts: 35 Visiting
• Foreign Faculty: 12

**Department-wise Faculty:**
• Engineering: 55 faculty
• Management: 35 faculty
• Science: 40 faculty
• Commerce: 25 faculty
• Arts: 25 faculty

**Qualifications:**
• Ph.D.: 80%
• M.Tech/MBA: 15%
• NET/SET Qualified: 70%

**Achievements:**
• Research Papers: 800+
• Patents Filed: 35
• Funded Projects: 50+
• Books Published: 75+
• International Collaborations: 25

**Student-Faculty Ratio:**
• UG Programs: 20:1
• PG Programs: 15:1
• Research Programs: 8:1

**Contact Information:**
• HOD Meetings: Tuesday 3-5 PM
• Faculty Advisors: Available daily
• Email: faculty@university.edu.in`,
      category: 'faculty',
      suggestions: ['hod contact', 'faculty achievements', 'research guidance']
    },

    'sports|gym|athletics': {
      text: `⚽ **Sports Facilities:**

**Outdoor Facilities:**
• Cricket Ground (Floodlit)
• Football Field
• Basketball Court (2)
• Volleyball Court (2)
• Tennis Court (2)
• Athletics Track (400m)
• Hockey Field

**Indoor Facilities:**
• Badminton Court (4)
• Table Tennis (6 tables)
• Chess Room
• Carrom Room
• Gymnasium (5000 sq ft)
• Yoga Center
• Squash Court

**Gymnasium:**
• Modern Equipment
• Cardio Zone
• Weight Training
• Personal Trainers
• Timings: 6 AM - 9 PM

**Sports Achievements:**
• University Champions: 5 years
• National Medalists: 25
• State Level Players: 75
• International Players: 8

**Annual Events:**
• Sports Meet: December
• Inter-College Tournament: January
• Marathon: February
• Faculty Tournament: March

**Coaching Available:**
• Professional coaches for all sports
• Special camps before events
• Free for university students`,
      category: 'sports',
      suggestions: ['gym membership', 'sports scholarship', 'tournament schedule']
    },

    'canteen|food|mess': {
      text: `🍽️ **Food Services:**

**Main Canteen:**
• Timings: 8:00 AM - 9:00 PM
• Cuisines: North Indian, South Indian, Chinese, Continental
• Seating Capacity: 200
• Average Meal: ₹60-100

**Menu:**
• Breakfast: 8-11 AM (Poha, Idli, Dosa, Paratha)
• Lunch: 12-3 PM (Thali, Rice, Roti, Sabzi)
• Evening Snacks: 4-7 PM (Samosa, Pakora, Noodles)
• Dinner: 7-9 PM (Full Meals, Roti Sabzi)

**Cafe Coffee Day:**
• Timings: 9 AM - 9 PM
• Coffee, Snacks, Sandwiches
• Student Discount: 10%

**Juice Center:**
• Fresh Fruit Juices
• Smoothies
• Milkshakes
• Timings: 10 AM - 6 PM

**Hostel Mess:**
• Morning: 7:30-9:00 AM
• Lunch: 12:30-2:00 PM
• Evening: 5:00-6:00 PM
• Dinner: 7:30-9:00 PM
• Monthly Fee: ₹2,500

**Food Court (Coming Soon):**
• Multiple Food Outlets
• Food Court Area
• Open till 11 PM`,
      category: 'canteen',
      suggestions: ['mess menu', 'canteen timings', 'food court']
    },

    'transport|bus|shuttle': {
      text: `🚌 **Transport Facilities:**

**College Bus Service:**
• Total Buses: 25
• Routes: All major city areas
• First Bus: 6:30 AM
• Last Bus: 8:00 PM

**Bus Routes:**
• Route 1: City Center - Campus
• Route 2: Railway Station - Campus
• Route 3: Metro Station - Campus
• Route 4: East Zone - Campus
• Route 5: West Zone - Campus
• Route 6: North Zone - Campus
• Route 7: South Zone - Campus

**Bus Pass Fees:**
• Monthly: ₹1,500
• Semester: ₹7,000
• Yearly: ₹13,000
• Daily: ₹100

**Shuttle Service:**
• Inter-department: Every 30 mins
• To Metro: Every 20 mins (Free)
• To Railway Station: Every 30 mins

**Parking:**
• Two-wheeler: ₹500/year
• Four-wheeler: ₹2,000/year
• Cycle: Free
• Electric Vehicle Charging: Available

**Emergency Transport:**
• Ambulance: 24/7 on campus
• Night Shuttle: 10 PM - 6 AM (On request)`,
      category: 'transport',
      suggestions: ['bus pass', 'parking fee', 'shuttle timings']
    },

    'contact|help|support': {
      text: `📞 **Contact Information:**

**Admission Office:**
• Phone: 1800-123-4567 (Toll Free)
• Email: admissions@university.edu.in
• Timing: 9:00 AM - 5:00 PM (Mon-Sat)

**Student Support:**
• General Help: help@university.edu.in
• Technical Support: it@university.edu.in
• Academic Queries: academics@university.edu.in
• Examination: exams@university.edu.in
• Library: library@university.edu.in
• Hostel: hostel@university.edu.in

**Emergency Contacts:**
• Security Control Room: 1122
• Medical Emergency: 108
• Women Helpline: 1091
• Fire Station: 101
• Police: 100

**Department Contacts:**
• Engineering: hod.engg@university.edu.in
• Management: hod.mba@university.edu.in
• Science: hod.science@university.edu.in
• Commerce: hod.commerce@university.edu.in

**Address:**
University of Excellence
Education City, Knowledge Park
Mumbai - 400001, Maharashtra

**Social Media:**
• Instagram: @university_official
• Twitter: @university_updates
• Facebook: /universityofficial
• LinkedIn: /university-of-excellence`,
      category: 'contact',
      suggestions: ['department email', 'emergency', 'location']
    },

    'grading|marks|results': {
      text: `📊 **Grading System:**

**Grade Points:**
• O (Outstanding): 10 (90-100%)
• A+ (Excellent): 9 (80-89%)
• A (Very Good): 8 (70-79%)
• B+ (Good): 7 (60-69%)
• B (Above Average): 6 (50-59%)
• C (Average): 5 (40-49%)
• P (Pass): 4 (35-39%)
• F (Fail): 0 (<35%)
• AB (Absent): 0

**CGPA Calculation:**
CGPA = (Σ Grade Points × Credits) / Σ Credits

**Example:**
Subject 1: Grade O (10) × 4 credits = 40
Subject 2: Grade A+ (9) × 3 credits = 27
Subject 3: Grade A (8) × 3 credits = 24
Total Points = 40+27+24 = 91
Total Credits = 4+3+3 = 10
CGPA = 91/10 = 9.1

**Percentage Equivalent:**
CGPA × 9.5 = Percentage

**Grade Meanings:**
• 9-10 CGPA: Outstanding
• 8-8.9 CGPA: Excellent
• 7-7.9 CGPA: Very Good
• 6-6.9 CGPA: Good
• 5-5.9 CGPA: Average
• Below 5: Need Improvement

**Result Access:**
• Website: results.university.edu.in
• Mobile App: University App
• SMS: Type RESULT <ROLLNO> to 56789`,
      category: 'grading',
      suggestions: ['result date', 'revaluation', 'transcript']
    },

    'holiday|vacation|break': {
      text: `🎉 **Academic Calendar 2024:**

**Semester Holidays:**
• Summer Break: May 25 - July 10, 2024
• Winter Break: Dec 25 - Jan 2, 2025
• Diwali Break: Nov 10-15, 2024

**National Holidays:**
• Republic Day: January 26
• Independence Day: August 15
• Gandhi Jayanti: October 2

**Festival Holidays:**
• Holi: March 25
• Eid-ul-Fitr: April 11
• Ram Navami: April 17
• Mahavir Jayanti: April 21
• Buddha Purnima: May 23
• Raksha Bandhan: August 19
• Janmashtami: August 26
• Ganesh Chaturthi: September 7
• Dussehra: October 12
• Diwali: November 12
• Guru Nanak Jayanti: November 15
• Christmas: December 25

**Important Dates:**
• Last Working Day: May 24
• Re-opening: July 11
• Foundation Day: September 15
• Sports Day: December 10
• Annual Day: February 20

Download full calendar from university portal.`,
      category: 'holiday',
      suggestions: ['summer break', 'winter break', 'festival holidays']
    },

    'menu|help|options': {
      text: `🤖 **I can help you with:**

**📝 Admissions**
• Application process
• Eligibility criteria
• Important dates
• Required documents

**🎓 Academics**
• Courses offered
• Syllabus
• Exam schedule
• Results & grading

**💰 Fees & Finance**
• Fee structure
• Payment options
• Scholarships
• Education loans

**🏠 Student Life**
• Hostel facilities
• Library services
• Sports & gym
• Canteen & food

**💼 Career**
• Placements
• Internships
• Training programs
• Company visits

**🚌 Facilities**
• Transport
• Parking
• Medical services
• Bank & ATM

**📞 Support**
• Contact information
• Emergency numbers
• Department emails
• Location & map

Just type your question or select from the buttons below!`,
      category: 'menu',
      suggestions: ['admission', 'fee', 'placement', 'hostel', 'scholarship']
    },

    'default': {
      text: `I'm here to help with your university queries! You can ask me about:

• 📝 **Admissions** - Process, dates, eligibility
• 🎓 **Courses** - Programs, syllabus, duration
• 📅 **Exams** - Schedule, results, grading
• 💰 **Fees** - Structure, payment, scholarships
• 🏠 **Hostel** - Facilities, fees, application
• 📚 **Library** - Timings, resources, rules
• 💼 **Placements** - Statistics, companies, training
• 👨‍🏫 **Faculty** - Departments, qualifications
• ⚽ **Sports** - Facilities, events, achievements
• 🚌 **Transport** - Bus routes, passes, parking
• 📞 **Contact** - Phone, email, address

Type your question or select from the suggested options below!`,
      category: 'default',
      suggestions: ['admission process', 'exam schedule', 'fee structure', 'hostel', 'scholarship', 'placement']
    }
  };

  static async getResponse(message, userInfo = {}) {
    const input = message.toLowerCase().trim();
    
    // Track query for analytics
    await this.trackQuery(input);

    // Check for specific keywords
    for (let [key, response] of Object.entries(this.responses)) {
      if (key !== 'default' && input.includes(key)) {
        return {
          text: response.text,
          category: response.category,
          suggestions: response.suggestions
        };
      }
    }

    // Check for multiple keywords
    if (input.includes('admission') && input.includes('date')) {
      return {
        text: this.responses['admission'].text,
        category: 'admission',
        suggestions: this.responses['admission'].suggestions
      };
    }

    if (input.includes('fee') && input.includes('hostel')) {
      return {
        text: this.responses['hostel'].text,
        category: 'hostel',
        suggestions: ['hostel fee', 'mess fee', 'total fee']
      };
    }

    // Return default response if no match
    return this.responses['default'];
  }

  static async trackQuery(query, category = 'default') {
    try {
      const tracker = new QueryTracker({
        query: query,
        category: category,
        timestamp: new Date()
      });
      await tracker.save();
    } catch (error) {
      console.error('Error tracking query:', error);
    }
  }

  static async getPopularSuggestions(limit = 7) {
    try {
      const popular = await QueryTracker.aggregate([
        { $group: { _id: '$category', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: limit }
      ]);

      const suggestions = [];
      for (let item of popular) {
        if (this.responses[item._id] && item._id !== 'default') {
          suggestions.push({
            text: item._id,
            icon: this.getIconForCategory(item._id),
            count: item.count
          });
        }
      }

      return suggestions;
    } catch (error) {
      console.error('Error getting popular suggestions:', error);
      return [
        'admission process',
        'exam schedule',
        'fee structure',
        'hostel',
        'scholarship',
        'placement',
        'library timings'
      ];
    }
  }

  static getIconForCategory(category) {
    const icons = {
      'admission': '📝',
      'fee': '💰',
      'exam': '📅',
      'hostel': '🏠',
      'scholarship': '🎯',
      'placement': '💼',
      'library': '📚',
      'faculty': '👨‍🏫',
      'sports': '⚽',
      'canteen': '🍽️',
      'transport': '🚌',
      'contact': '📞',
      'grading': '📊',
      'holiday': '🎉'
    };
    return icons[category] || '❓';
  }
}

module.exports = ResponseEngine;