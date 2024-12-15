## 1. Assuming the system currently has three microservices: Customer API, Master Data API,and Transaction Data API, there is a new feature that requires data from all three microservices to be displayed in near real-time. The current technology stack includes REST APIs and an RDBMS database. How would you design a new API for this feature?

- การเรียกข้อมูลหรือติดต่อกันระหว่าง Microservice ใช้ Redis หรือ RabbitMQ
- การแสดงผล data แบบ real-time ใช้เป็น Websocket

## 2. Assuming the team has started planning a new project, the project manager asks you for a performance test strategy plan for this release. How would you recommend proceeding to the project manager?

การทดสอบ performance ของ API อาจมีการทดสอบดังนี้

- การทดสอบ ความถูกต้องของ API
- การทดสอบ Concurrency
- ก่อนทำการ release ถ้าเกิดข้อผิดพลาดหรือจากการทดสอบอาจมีการอัพเดทสถานะการทดสอบตลอดว่าเกิดข้อผิดพลาดในส่วนไหนและใช้เวลาในการแก้ไขประมาณเท่าไหร่

## 3. Additional Requirements:

- Validation: Outline how you will validate data inputs in both APIs to ensure data integrity.
  ใช้ DTO ในการ validate key ของข้อมูลว่าอันไหนเป็น require data หรืออันไหนเป็น optional รวมถึงการเช็คประเภทของข้อมูล (string, int ,array)

- Database Design (สามารถดูรูปได้ใน folder er-diagram)
  Table มีทั้งหมด 3 ตาราง (product, language, translation)
  product จะเก็บข้อมูลของสินค้าพวก ราคา น้ำหนัก ไซส์ หรืออื่นๆ ที่ไม่จำเป็นต้องเกี่ยวกับตัวภาษา
  language จะเก็บข้อมูลของชื่อภาษาและ code ของภาษาซึ่งเป็น unique
  translation จะเก็บข้อมูลในส่วนของที่ต้องใช้แปลในของแต่ละสินค้า (ชื่อสินค้า, รายละเอียดสินค้า) ซึ่งมี FK ของ product และ language ในการระบุถึงสินค้าและภาษานั้นๆ

- Testing Strategy
  Unit Test

  - ทดสอบการสร้าง product return ข้อมูลหลังจากสร้าง product ถูกต้องไหมเพื่อนำไปใช้ต่อตอนสร้าง translation และถ้าหากเกิด error ตัว product translation ต้องไม่ถูกสร้างทั้งหมด เพราะมีการทำงานแบบ transaction

  Integration test : ทดสอบการเรียก API ผ่าน Postman

  - ทดสอบสร้างตัวสินค้าเช็คความถูกต้องของสินค้าที่สร้างรวมถึงรายละเอียดภาษาต่างๆของสินค้าถูกต้องไหม
  - ทดสอบการเรียกข้อมูลสินค้าเช็คความถูกต้องของการ search สินค้าในแต่ละภาษาทำงานถูกต้องไหม และการทำ pagination การกำหนดค่า limit และ page ของ API ให้ response ข้อมูลได้ตามจำนวนที่กำหนดไหม

  End to end test : ทดสอบหลังจาก Frontend และ Backend เชื่อมต่อ API เรียบร้อยแล้วอาจจะนำขึ้น server UAT เพื่อ test การทำงานที่ถูกต้องตาม Flow
