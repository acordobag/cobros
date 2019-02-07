CREATE DEFINER=`acordoba`@`%` TRIGGER `payments_AFTER_UPDATE` AFTER UPDATE ON `payments` FOR EACH ROW BEGIN
DECLARE v_actualAmmount double;
DECLARE v_initialAmmount double;

	SELECT actualAmmount, initialAmmount INTO v_actualAmmount, v_initialAmmount from cobros.accounts WHERE accounts.id = NEW.accountId;
	
    SET v_actualAmmount = v_actualAmmount - NEW.ammount;
    
    IF NEW.approved = 1 AND v_actualAmmount <= v_initialAmmount  AND v_actualAmmount >= 0 THEN
		UPDATE cobros.accounts SET actualAmmount = v_actualAmmount
        WHERE accounts.id = NEW.accountId;
        
	ELSEIF v_actualAmmount > v_initialAmmount OR v_actualAmmount < 0 THEN 
		SIGNAL SQLSTATE '45000'
		SET MESSAGE_TEXT = CONCAT('EL MONTO NO PUEDE SER SUPERIOR A LO QUE SE DEBE NI NEGATIVO', v_actualAmmount);
    END IF;
    
END