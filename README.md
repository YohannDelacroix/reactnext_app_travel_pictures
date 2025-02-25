# **APP TRAVEL PICTURE**

## Description

## Demo

## Technologies Used


app/
│── layout.tsx                      # 🌍 Main layout (Header & Footer)
│── page.tsx                        # Landing page
│── shopping/                       # 📂 Shopping section
│   ├── layout.tsx                  # ✅ Shared layout between Gallery & Cart, contains redux provider
│   ├── privateGallery/             # 📂 Private Gallery section
    │   ├── [id]                    # Private gallery (Identified with id)
    │   │   ├── page.tsx     
│   │── cart/                       # 📂 Page cart
│   │   ├── page.tsx                # Use Cart component
    │   │── payment/                    # 📂 Payment section
    │   │   ├── page.tsx                # Use Payment component
    │   │   ├── confirmation/           # 📂 Payment confirmation section
    │   │   │   ├── page.tsx            # Use PaymentConfirmation component  
│   ├── redux                       # Redux store for private gallery shopping
│   │   ├── store.ts    
│   │   ├── slices/ 
│   │   │   │   ├── gallerySlice.ts     
│   │   │   │   ├── cartSlice.ts     
│   │   │   │   ├── userSlice.ts   
│   ├── components                  #Main components of the Shopping section
│   │   ├── Payment/                #Payment components
│── api/                            # 📂 API
│   ├── payment/
│   │   ├── route.ts                # Payment route API
│── components/                     # 📂 Reusable components
│   ├── CardImage.tsx               # CardImage component
│   ├── Cart.tsx                    # Reusable Cart component t
│   ├── Payment.tsx                 # Reusable Payment component
│   ├── PaymentConfirmation.tsx     # Reusable PaymentConfirmation component


