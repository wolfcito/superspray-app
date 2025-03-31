'use client'

import { ChevronDown, Clock, Settings, X } from 'lucide-react'
import { useState } from 'react'
import { useWallet } from '@/hooks/useWallet'
import { Button } from '@/components/ui/button'
import { ClipboardIcon } from '@/components/icons/clipboard-icon'
import { ChainIcon } from '@/components/icons/chain-icon'
import { AddIcon } from '@/components/icons/add-icon'

interface Address {
  id: string
  address: string
  amount: string
}

export function Superspray() {
  const [addresses, setAddresses] = useState<Address[]>([
    { id: '1', address: '0x...', amount: '0.00' },
    { id: '2', address: '0x...', amount: '0.00' },
    { id: '3', address: '0x...', amount: '0.00' },
    { id: '4', address: '0x...', amount: '0.00' },
  ])
  const { isConnected, connect, connectors, isConnecting, sendBatchTransactions, isSending } = useWallet()

  const removeAddress = (id: string) => {
    setAddresses(addresses.filter(addr => addr.id !== id))
  }

  const addNewAddress = () => {
    const newId = (Math.max(...addresses.map(addr => parseInt(addr.id))) + 1).toString()
    setAddresses([...addresses, { id: newId, address: '0x...', amount: '0.00' }])
  }

  const clearAll = () => {
    setAddresses([])
  }

  const handleSpray = async () => {
    if (!isConnected) {
      connect({ connector: connectors[0] })
      return
    }
    await sendBatchTransactions(addresses)
  }

  return (
    <div className="min-h-screen bg-white font-sans">
      <main className="mx-auto max-w-5xl px-4 py-8">
        <div className="mb-10 text-center">
          <h1 className="mb-2 text-4xl font-bold">
            Batch transfer tokens seamlessly
          </h1>
          <p className="text-xl text-gray-500">fast, secure, and affordable.</p>
        </div>

        <div className="rounded-3xl border bg-white p-7 shadow-lg border-gray-200">
          {/* Chain Selector */}
          <div className="mb-4 flex gap-2">
            <div className='border border-gray-200 rounded-full flex gap-1 p-1'>
            <div className="flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500">
                <ChainIcon />
              </div>
              <span>Chain</span>
            </div>
            
            <div className="flex items-center gap-2 rounded-full [background-color:#F9F9F9] [border:1px_solid_#F1F1F1] px-4 py-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500">
                <ChainIcon />
              </div>
              <span>ETH</span>
              <ChevronDown className="h-4 w-4" />
            </div></div>
            <div className="ml-auto flex gap-2">
            <Button className="flex items-center gap-2 rounded-xl [background-color:#FF5079] hover:opacity-90 px-4 py-2 text-white shadow-xs">
                <AddIcon />
                Import CSV
              </Button>
              <Button variant="outline" size="icon" className="[border:1px_solid_#F1F1F1] shadow-xs rounded-full">
                <Clock className="h-5 w-5 text-gray-500" />
              </Button>
              <Button variant="outline" size="icon" className="[border:1px_solid_#F1F1F1] shadow-xs rounded-full">
                <Settings className="h-5 w-5 text-gray-500" />
              </Button>
            </div>
          </div>

          {/* Send To Section */}
          <div className="mb-2 flex items-center justify-between">
            <h2 className="text-sm font-semibold ml-1">Send To</h2>
          </div>

          {/* Address Inputs */}
          <div className="mb-6 max-h-[300px] overflow-y-auto pr-2 space-y-3">
            {addresses.map((item) => (
              <div
                key={item.id}
                className="flex gap-3"
              >
                <div className="flex-1 rounded-xl [background-color:#F9F9F9] [border:1px_solid_#F1F1F1] px-4 py-3">
                  <div className="text-xs [color:#999999]">Wallet address</div>
                  <div className="text-xs [color:#999999]">{item.address}</div>
                </div>
                <div className="w-40 rounded-xl [background-color:#F9F9F9] [border:1px_solid_#F1F1F1] px-4 py-3">
                  <div className="text-xs [color:#999999]">0.00</div>
                  <div className="text-xs [color:#999999]">ETH</div>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="flex h-10 w-10 items-center justify-center self-center rounded-full [background-color:#F9F9F9] [border:1px_solid_#F1F1F1] shadow-xs"
                  onClick={() => removeAddress(item.id)}
                >
                  <X className="h-5 w-5 text-gray-500" />
                </Button>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="mb-6 flex items-center justify-between">
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex items-center gap-2 rounded-xl px-4 py-3 [border:1px_solid_#F1F1F1] shadow-xs"
                onClick={addNewAddress}
              >
                <AddIcon />
                Add new
              </Button>
              <Button
                variant="ghost"
                className="px-4 py-3 underline underline-offset-4"
              >
                <ClipboardIcon />
                Paste from Clipboard
              </Button>
              <Button
                variant="ghost"
                className="px-4 py-3 underline underline-offset-4"
                onClick={clearAll}
              >
                Clear all
              </Button>
            </div>
            <div className="text-right">
              <div className="text-xl font-bold">Total: 12.58 ETH</div>
              <div className="text-sm text-gray-500">
                Gas fee: 0.0000254 ETH
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            className="w-full rounded-xl [background-color:#FF5079] hover:opacity-90 py-4 text-lg font-semibold text-white disabled:opacity-50 shadow-xs"
            onClick={handleSpray}
            disabled={isConnecting || isSending}
          >
            {isConnecting ? 'Connecting...' : isSending ? 'Sending...' : isConnected ? 'Spray!' : 'Connect Wallet'}
          </Button>
        </div>
      </main>
    </div>
  )
} 