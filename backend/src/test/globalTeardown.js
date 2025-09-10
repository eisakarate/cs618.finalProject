export default async function globalSetup() {
  //global instance: stop it
  global.__MONGOINSTANCE.stop()
}
