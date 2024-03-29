import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, Bytes } from "@graphprotocol/graph-ts"
import { InterfaceImplementerSet } from "../generated/schema"
import { InterfaceImplementerSet as InterfaceImplementerSetEvent } from "../generated/erc777/erc777"
import { handleInterfaceImplementerSet } from "../src/erc-777"
import { createInterfaceImplementerSetEvent } from "./erc-777-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let addr = Address.fromString("0x0000000000000000000000000000000000000001")
    let interfaceHash = Bytes.fromI32(1234567890)
    let implementer = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let newInterfaceImplementerSetEvent = createInterfaceImplementerSetEvent(
      addr,
      interfaceHash,
      implementer
    )
    handleInterfaceImplementerSet(newInterfaceImplementerSetEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("InterfaceImplementerSet created and stored", () => {
    assert.entityCount("InterfaceImplementerSet", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "InterfaceImplementerSet",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "addr",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "InterfaceImplementerSet",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "interfaceHash",
      "1234567890"
    )
    assert.fieldEquals(
      "InterfaceImplementerSet",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "implementer",
      "0x0000000000000000000000000000000000000001"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
