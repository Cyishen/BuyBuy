const products = [
    {
        imgUrl: 'img/iPhone14Pro.png',
        proName: 'iPhone14 Pro',
        proPrice: '$110'
    },
    {
        imgUrl: 'img/iPhone13Pro.png',
        proName: 'iPhone13',
        proPrice: '$120'
    },
    {
        imgUrl: 'img/IPadPro.png',
        proName: 'IPad Pro',
        proPrice: '$130'
    },
    {
        imgUrl: 'img/iPad10.png',
        proName: 'iPad 10',
        proPrice: '$140'
    },
    {
        imgUrl: 'img/iPadAir.png',
        proName: 'iPad Air',
        proPrice: '$150'
    },
    {
        imgUrl: '#',
        proName: '商品6',
        proPrice: '$160'
    },
    {
        imgUrl: '#',
        proName: '商品7',
        proPrice: '$170'
    },
    {
        imgUrl: '#',
        proName: '商品8',
        proPrice: '$180'
    },
    {
        imgUrl: '#',
        proName: '商品9',
        proPrice: '$190'
    },
    {
        imgUrl: '#',
        proName: '商品10',
        proPrice: '$200'
    }
]
    
    // 商品列表
    const productsContainer = document.getElementById('productsContainer');;

    products.forEach( product => {
        const productItem = document.createElement('ul');
        productItem.innerHTML = `
            <li>
                <div class="pro_img">
                    <img src="${product.imgUrl}" width="100" height="100">
                    <p>${product.proName}</p>
                    <p>${product.proPrice}</p>
                    <button class="add_btn">加入購物車</button>
                </div>
            </li>
        `;
        productsContainer.appendChild(productItem);
    });

    // 渲染購物車
    const addButtonShoppingList = document.querySelectorAll('.add_btn');
    const renderContainer = document.getElementById('renderContainer');

    let selectedProductIndex = [];
    addButtonShoppingList.forEach( (addButton, index) => {
        addButton.addEventListener('click', () => {
            selectedProductIndex = index;
            const selectedProduct = products[selectedProductIndex];

            const renderContent = `
                <div class="render">
                    <div class="render-left-side">
                        <div class="render-head_row">
                            <div class="render-check render-left">
                                <input type="checkbox" id="checkbox}">
                                <img src="${selectedProduct.imgUrl}" width="80" height="80" class="renderImg">
                                <p class="render-item-name">${selectedProduct.proName}</p>
                            </div>
                        </div>
                    </div>
                    <div class="render-right-side">
                        <div class="render-head_row">
                            <div class="render-price render-right">${selectedProduct.proPrice}</div>
                            <div class="render-number render-right">
                                <div class="numBar">
                                    <button class="bo minusBtn">-</button>
                                    <p class="quantity quantity-number">1</p>
                                    <button class="bo addBtn">+</button>
                                </div>
                            </div>
                            <div class="render-subtotal render-right">${selectedProduct.proPrice}</div>
                            <div class="render-remove render-right">刪除</div>
                        </div>
                    </div>
                </div>
            `;
        
        const renderElement = document.createElement('div');
        renderElement.innerHTML = renderContent;

        renderContainer.appendChild(renderElement);
        renderContainer.style.display = 'block';


        });

    });
    

    // 加
    function addSingle(renderBlock) {
        const quantityNum = renderBlock.querySelector('.quantity-number');
        let quantity = parseInt(quantityNum.textContent);

        quantity++;
        quantityNum.textContent = Math.max(quantity, 1);

        updateSingleSubtotal(renderBlock);
    }

    // 減
    function minusSingle(renderBlock) {
        const quantityNum = renderBlock.querySelector('.quantity-number');
        let quantity = parseInt(quantityNum.textContent);
        quantity--;
        quantityNum.textContent = Math.max(quantity, 1);

        updateSingleSubtotal(renderBlock);
    }

    // 單個商品總額
    function updateSingleSubtotal(renderBlock) {
        const quantityNum = renderBlock.querySelector('.quantity-number');
        const priceElement = renderBlock.querySelector('.render-price');
        const subtotalElement = renderBlock.querySelector('.render-subtotal');
        // console.log(quantityNum, priceElement, subtotalElement)
        let quantity = parseInt(quantityNum.textContent);

        const priceString = priceElement.textContent;
        const priceMatch = priceString.match(/[\d.]+/); 

        let price = parseFloat(priceMatch[0]);

        const subtotal = quantity * price;
        subtotalElement.textContent = '$' + subtotal.toString();
    }
    
    // 更新總金額
    function updateTotalAmount() {
        let overallTotal = 0;
        const checkedBoxes = renderContainer.querySelectorAll('input[type="checkbox"]:checked');
        
        checkedBoxes.forEach( (checkbox) => {
            const renderBlock = checkbox.closest('.render'); 
            const subtotalElement = renderBlock.querySelector('.render-subtotal');
            const subtotal = parseFloat(subtotalElement.textContent.substring(1)); 
            overallTotal += subtotal;
        });

        const totalAmountElement = document.getElementById('price_num');
        totalAmountElement.textContent = overallTotal.toFixed(2);
    }


    // 監聽事件
    renderContainer.addEventListener('click', (event) => {
        const target = event.target;
        const renderBlock = target.closest('.render'); 
        
        if (!renderBlock) {
            return; 
        }

        if (target.classList.contains('addBtn')) {
            addSingle(renderBlock)
            updateTotalAmount();
        } else if (target.classList.contains('minusBtn')) {
            minusSingle(renderBlock) 
            updateTotalAmount();
        } else if (target.classList.contains('render-subtotal')) {
            updateSingleSubtotal(renderBlock); 
            updateTotalAmount();
        } else if (target.classList.contains('render-remove')) {
            renderBlock.remove(); 
            updateTotalAmount();
        }  else if (target.type === 'checkbox') {
            updateTotalAmount();
        }
    });
