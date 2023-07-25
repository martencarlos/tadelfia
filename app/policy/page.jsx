import styles from "./policy.module.css";


// Static metadata
export const metadata = {
  title: "Policy", description: "Tadelfia Policies" 
}

function policy() {
  return (
    <div className={styles.policy}>
      <h1>Tadelfia Policy</h1>
      <h2>Payment, Deposit & Cancellation Policies</h2>
      <p>
        Upfront Payment / Booking deposit: 30% of the total booking amount
        should be paid in advance.
      </p>

      <p>
        Full refund of the booking deposit for cancellations made within 48
        hours of reservation minus transaction fees, if the check-in date is at
        least 14 days away and provided the booking deposit has been received.
        50% refund of the booking deposit for cancellations made at least 14
        days before check-in. No refunds for cancellations made within 7 days of
        check-in.
      </p>

      <p>
        The rest of the amount due will be settled upon arrival of the Guest.
      </p>

      <p>
        In addition, the guest shall provide a 300€ damage deposit upon arrival
        that will be refunded provided that no damages to the property are found
        and that the occupied spaces are left reasonably clean.
      </p>

      <h2>Check-in / Check-out Times</h2>
      <p>Guest Check-in time after 3:00 PM.</p>

      <p>Guest Check-out time is at most up to 10:00 AM.</p>

      <h2>Additional Charges</h2>
      <p>
        Cleaning charge: 25€/stay unless the apartment is not left reasonably
        clean, in which case an amount can be subtracted from the damage
        deposit.
      </p>

      <p>
        The apartment should be cleaned of perishable leftovers and garbage upon
        checkout, otherwise an additional 40€ charge will be applied.
      </p>

      <p>
        Tourist Tax: the tourist tax of 0.5€/night is included in the total
        booking amount. The guest will have to sign a document upon arrival.
      </p>

      <p>
        For guests staying more than 7 nights, bed linens are changed
        approximately once a week. For more frequent changing 4€ per request per
        bed will be charged to cover the cleaning costs.
      </p>

      <p>
        Bathroom towels can be changed for guest stays of more than 7 nights
        each 4 nights at no extra cost at the request of the guest. For more
        frequent changing 3€ per request per towel will be charged.
      </p>

      <p>
        The supplied towels meant for pool use can be taken to the beach with a
        surcharge of 4€/towel.
      </p>

      <p>
        Children under the age of 6 and babies are welcomed free of charge. Baby
        Kots are also provided free of charge.
      </p>

      <h2>Apartment Rules</h2>
      <p>Smoking is not allowed indoors.</p>

      <p>
        Quiet hours between 9:00 PM and 09:00 AM during which the pool will not
        be accessible (pool closing hours). The TV volume should stay moderate.
      </p>

      <p>
        Do not throw anything in the toilet and use the bins provided for the
        toilet paper. Unclogging the toilet is very costly in the region - See
        Damage price list
      </p>

      <p>
        Guests are kindly asked to separate trash and recyclables and to sort
        recyclables in the bin area close to the pool area as indicated. There
        are 4 bins, one for each recycling stream (glass, metal, plastic,
        paper). Only clean recyclables are accepted.
      </p>

      <p>
        General Waste/trash should be disposed of in the bins on the main street
        near the church at the entrance of the village, to avoid attracting
        wasps. Exact location on google maps: Link
      </p>

      <p>
        To protect the window shutters from the strong winds guests should never
        leave them free to swing and always attach them on the wall hooks or
        leave them half open using the built in mechanisms.{" "}
      </p>

      <p>
        For the same reason as above guests must close the parasols in the pool
        area after use.
      </p>

      <p>
        Indoor and shared pool areas are smoke/vape free areas. Cigaret buds
        will have to be properly disposed of in the trash bin. Throwing cigaret
        buds on the floor or in nature is strictly forbidden and dangerous!
        (Risk of forest fires)
      </p>

      <p>Alcoholic drinks are not allowed in the pool area.</p>

      <p>
        Guests must always take their personal belongings with them, place the
        pool area furniture back to their initial state and take their trash
        with them.
      </p>

      <p>
        Guests must always take care and be gentle while using equipment &
        furniture.
      </p>

      <p>Pets are not allowed on the property.</p>

      <p>
        Parties/events are not allowed unless with prior agreement with prior
        agreement of the property manager.
      </p>

      <p>
        Parking space is on a first come first served basis. Only one parking
        slot per apartment is available.
      </p>

      <p>
        Guests must leave the apartment at an acceptable state upon departure as
        a sign of respect towards the cleaning personnel.{" "}
      </p>

      <p>Guests must report any damage, unintentional or not.</p>

      <p>
        To offer the best possible experience to all guests, the property
        manager and owners of the property reserve the right to cancel a guest’s
        booking without any refund, provided that the guest or the people with
        him have acted, repetitively or not, with negligence or with willful
        misconduct.
      </p>

      <h2>Data Privacy</h2>
      <p>
        T’adelfia Apartments collects & stores data such as guest names, email
        address, phone number, official ID information to allow communication
        with guests, planning for their arrival as well in compliance with Greek
        law.
      </p>

      <p>T’adelfia Apartments does not store bank or credit card numbers.</p>

      <p>
        T’adelfia Apartments data collected is stored on third party service
        providers that respect GDPR law.
      </p>

      <p>
        T’adelfia Apartments does not give or sell guest information to third
        parties.
      </p>

      <p>
        T’adelfia Apartments reserves the right to store guest contact
        information with the purpose of sending information such as special
        offers, news about the accommodation.
      </p>
    </div>
  );
}

export default policy;
