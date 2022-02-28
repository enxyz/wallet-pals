// export default function Main() {
//   // initial state
//   var to_return = (
//     <>
//       <div className="flex justify-center">
//       <div className="w-5/12">
//         <div className="mb-12">
//           <div className="mb-3">
//             <Title>Check Wallets</Title>
//           </div>
//           <p className="text-sm">
//             Enter wallets to check. The wallets will be checked for shared
//             tokens.
//           </p>
//         </div>
//         <form>
//           <FormGroup>
//             <Label>Wallet addresses</Label>
//             <TextArea
//               onChange={(event) => setWalletAddresses(event.target.value)}
//             ></TextArea>
//           </FormGroup>
//           <div className="max-w-fit">
//             <ActionButton onClick={buttonPressed}>{buttonStatus}</ActionButton>
//           </div>
//         </form>
//       </div>
//     </div>
//     </>
//   );

//   var to_return = (
//     <>
//       <title>wallet-pals</title>
//       <p></p>
//       <p></p>
//       <br></br>
//       <hr></hr>
//       <br></br>
//       <div></div>
//       <div>Hey wallet pals!!</div>
//       <div>
//         both {walletAddresses[0]} and {walletAddresses[1]} share{' '}
//         {sharedTokens.size} tokens!!!!{' '}
//       </div>
//       <div>{sharedTokens}!!!!!!!!!!!!</div>
//     </>
//   );
//   if (sharedTokens.size === 0) {
//     to_return = (
//       <>
//         <html>
//           <body>
//             <title>wallet-pals</title>
//             <p></p>
//             <div>
//               Sorry, the wallets {walletAddresses[0]} and {walletAddresses[1]}{' '}
//               share no tokens....
//             </div>
//             <div>
//               <p>So you may not have any interests in common......</p>
//               Then again, maybe try sharing and you&apos;ll find common ground!
//               :)<p></p>
//               <div>Or, try sharing a 🍔, 🍺, 🎵, 🌎, cause 🤷🏻</div>
//             </div>
//           </body>
//         </html>
//       </>
//     );
//   }

//   return to_return;
// }
