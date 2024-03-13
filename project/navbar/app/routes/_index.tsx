import { useEffect, useState } from "react";
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import useUserSOLBalanceStore from '~/stores/useUserSOLBalanceStore'; // 确保路径正确

export default function Index() {
  const wallet = useWallet();
  const { connection } = useConnection();
  const { balance, getUserSOLBalance } = useUserSOLBalanceStore();

  useEffect(() => {
    if (wallet.publicKey) {
      console.log(wallet.publicKey.toBase58());
      getUserSOLBalance(wallet.publicKey, connection);
    }
  }, [wallet, connection, getUserSOLBalance]);

  // getUserSOLBalance函数的实现依赖于你的useUserSOLBalanceStore
  // 确保在Remix项目中适当调整该hook或者状态管理逻辑

  return (
    <div className="md:hero mx-auto p-4">
    <div className="md:hero-content flex flex-col">
      <div className='mt-6'>
      </div>
      <h4 className="md:w-full text-2x1 md:text-4xl text-center text-slate-300 my-2">
        <p>You Balance</p>
      </h4>
      <div className="flex flex-col mt-2">
        <h4 className="md:w-full text-2xl text-slate-300 my-2">
        {wallet &&
        <div className="flex flex-row justify-center">
          <div>
            {(balance || 0).toLocaleString()}
            </div>
            <div className='text-slate-600 ml-2'>
              SOL
            </div>
        </div>
        }
        </h4>
      </div>
    </div>
  </div>
  );
}
