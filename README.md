# 💺Seat Booking API
Generic API for seat a booking system with functionalities like
- Creating pricing classes 💵
- Creating seats with those pricing classes 🪑
- And making bookings on those seats 📅

#### Technologies Used: NestJS | Prisma | Docker | PostgreSQL

### Project Setup
1. Clone the repo `git clone https://github.com/DivyanshSareen/seat-booking-api.git`
2. Run docker command `docker compose up` in the root directory of the project
3. You can add some mock values using the next two steps(optional)
4. Make a get request to `http://localhost:8080/helper/upload/pricing` to upload Pricing data
5. Make a get request to `http://localhost:8080/helper/upload/seat` to upload Seat data
6. Postman collection to play with the API(calls for step 4 and 5 present as well)
[![Run in Postman](https://run.pstmn.io/button.svg)](https://god.gw.postman.com/run-collection/16401766-2359a965-cac6-4655-a26f-14e726bfaebd?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D16401766-2359a965-cac6-4655-a26f-14e726bfaebd%26entityType%3Dcollection%26workspaceId%3Dfe089a7a-3409-4a2a-95c8-06918729b0c6)

### Seat Pricing Logic
● Less than 40% of seats booked - use the min_price, if min_price is not
available, use normal_price

● 40% - 60% of seats booked - use the normal_price, if normal_price not
available, use max_price

● More than 60% of seats booked - use the max_price, if max_price is not
available, use normal_price

### Routes

**Get All Seats**: GET `/seats`

**Get Seat pricing**: GET `/seats/id`

**Create Booking**: POST `/booking`

**Retrieve Bookings**: GET `/bookings?userIdentifier=<email or phone number>`

### UML Diagram

![image](https://github.com/DivyanshSareen/seat-booking-api/assets/59335572/e6103c74-4d8b-4cab-8952-09fe4e56cec3)




