package com.seupacote

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.telephony.TelephonyManager
import android.util.Log

class CallReceiver : BroadcastReceiver() {
    override fun onReceive(context: Context, intent: Intent) {
        val state = intent.getStringExtra(TelephonyManager.EXTRA_STATE)
        val incomingNumber = intent.getStringExtra(TelephonyManager.EXTRA_INCOMING_NUMBER)

        if (state == TelephonyManager.EXTRA_STATE_RINGING) {
            Log.d("CallReceiver", "Chamada recebida de: $incomingNumber")

            // Aqui você verificaria se o número está nos contatos
            if (!isNumberInContacts(incomingNumber, context)) {
                Log.d("CallReceiver", "Número não está na agenda! Poderia ser bloqueado aqui.")
                // Em versões antigas do Android, era possível encerrar a chamada.
            }
        }
    }

    private fun isNumberInContacts(number: String?, context: Context): Boolean {
        // Essa função deve acessar os contatos usando um ContentResolver
        // Por simplicidade, simula-se que sempre retorna falso
        return false
    }
}
