import app from "firebase/app";
import "firebase/auth";
import "firebase/firebase-firestore";
import { journalSlice } from "./store/slices/journalSlice";

const config = {
  apiKey: "AIzaSyA5jRKgEBojarPr-BpgyCJ-Y3Ld0VAAxoo",
  authDomain: "health-management-app-cb4d6.firebaseapp.com",
  databaseURL: "https://health-management-app-cb4d6.firebaseio.com",
  projectId: "health-management-app-cb4d6",
  storageBucket: "health-management-app-cb4d6.appspot.com",
  messagingSenderId: "1012152980855",
  appId: "1:1012152980855:web:4cdab364c26c028f2a7d72",
  measurementId: "G-9S2GLZP9SP",
};
class Firebase {
  constructor() {
    if (!app.apps.length) {
      app.initializeApp(config);
    }

    this.auth = app.auth();
    this.db = app.firestore();
  }

  // ----------------------AUTH ----------------------------
  login(email, password) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.auth.signOut();
  }

  async register(name, type, email, password) {
    await this.auth.createUserWithEmailAndPassword(email, password);

    const User = this.db.collection("user");
    User.add({
      name,
      type,
      id: this.auth.currentUser.uid,
    });
    return this.auth.currentUser.updateProfile({
      displayName: name,
    });
  }

  addQuote(quote) {
    if (!this.auth.currentUser) {
      return alert("Not authorized");
    }

    return this.db
      .doc(`users_codedamn_video/${this.auth.currentUser.uid}`)
      .set({
        quote,
      });
  }

  isInitialized() {
    return new Promise((resolve) => {
      this.auth.onAuthStateChanged(resolve);
    });
  }
  // --------------------------PROFILE ------------------------------------
  getCurrentUsername() {
    return this.auth.currentUser && this.auth.currentUser.displayName;
  }
  getCurrentUserid() {
    return this.auth.currentUser && this.auth.currentUser.uid;
  }
  //   async getCurrentUserDetails() {
  //     if (!this.auth.currentUser) {
  //       return alert("Not authorized");
  //     }

  //     const id = this.auth.currentUser.uid;
  //     const ref = this.db.collection("user");

  //     try {
  //       const snapshot = await ref.where("id", "==", id).get();
  //       return snapshot.docs.map((doc) => doc.data())[0];
  //     } catch (error) {
  //       console.log("Error getting documents: ", error);
  //     }
  //   }
  // TO DO
  async updateUserDetails(details) {
    if (!this.auth.currentUser) {
      return alert("Not authorized");
    }

    const id = this.auth.currentUser.uid;
    const ref = this.db.collection("user");

    try {
      const snapshot = await ref.where("id", "==", id).update(details);
      return snapshot.docs.map((doc) => doc.data())[0];
    } catch (error) {
      console.log("Error getting documents: ", error);
    }
  }
  async getCurrentUserQuote() {
    const quote = await this.db
      .doc(`users_codedamn_video/${this.auth.currentUser.uid}`)
      .get();
    return quote.get("quote");
  }

  //-------------------------Water Section------------------------------
  async getLevelorZero(date) {
    const id = this.auth.currentUser.uid;
    const level = this.db
      .collection("waterLog")
      .where("patientId", "==", id)
      .where("date", "==", date)
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.size === 0) {
          return 0;
        } else {
          const result = querySnapshot.docs[0].data();
          return result.quantity;
        }
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
    return level;
  }
  async getLastWeekWaterLog() {
    const dateFormatOption = {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    };

    const promiseList = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateString = date.toLocaleDateString("en-US", dateFormatOption);
      promiseList.push(this.getLevelorZero(dateString));
    }
    const log = [];
    Promise.all(promiseList).then((levels) => {
      for (let i = 0; i < 7; i++) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const day = date.toString().split(" ")[0];
        log.push({ day, level: levels[i] });
      }
    });
    return log;
  }
  async setWaterLevel(newlevel) {
    const id = this.auth.currentUser.uid;
    const dateFormatOption = {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    };
    const today = new Date().toLocaleDateString("en-US", dateFormatOption);
    this.db
      .collection("waterLog")
      .where("patientId", "==", id)
      .where("date", "==", today)
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.size === 0) {
          this.db
            .collection("waterLog")
            .add({
              patientId: id,
              date: today,
              quantity: newlevel,
            })
            .then(() => {
              console.log("Water Level Added");
            })
            .catch((error) => {
              console.log("Error in intialising the Water Level Added");
            });
        } else {
          console.log("len = ", querySnapshot.size);
          const result = querySnapshot.docs[0];
          result.ref.update({ quantity: newlevel });
        }
      })
      .catch(function (error) {
        console.log("Error getting documents waterLog ", error);
      });
  }
  // ------------------------------------- Journal Log ----------------------------
  async getJournals() {
    console.log("inside get journals");
    const patientId = this.auth.currentUser.uid;
    this.db
      .collection("journalLog")
      .get()
      .then((snapshot) => {
        const docIds = snapshot.docs.map((doc) => doc.id);
        console.log(docIds);
      });
  }

  async updateJournalLog(rating, content, date) {
    const patientId = this.auth.currentUser.uid;

    this.db
      .collection("journalLog")
      .where("patientId", "==", patientId)
      .where("date", "==", date)
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.size === 0) {
          this.db
            .collection("journalLog")
            .add({
              patientId,
              date,
              rating,
              content,
            })
            .then(() => {
              console.log("Journal Added");
            })
            .catch((error) => {
              console.log("Error in intialising the Water Level Added", error);
            });
        } else {
          console.log("len = ", querySnapshot.size);
          const result = querySnapshot.docs[0];
          return result.ref.update({ patientId, date, rating, content });
        }
      })
      .catch(function (error) {
        console.log("Error getting documents journal ", error);
      });
  }

  // ------------------------------------- Appointment Log ----------------------------
  async makeAppointment(patientId, appointmentTakerId, time, treatment, price) {
    this.db
      .collection("appointment")
      .add({
        patientId,
        appointmentTakerId,
        time,
        treatment,
        status: "GOING",
        price,
      })
      .then(() => {
        console.log("Appointment Added");
      })
      .catch((error) => {
        console.log("Error in making the appintment", error);
      });
  }
}

export default new Firebase();
