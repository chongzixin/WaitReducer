/**
 * Appcelerator Titanium Mobile
 * Copyright (c) 2009-2013 by Appcelerator, Inc. All Rights Reserved.
 * Licensed under the terms of the Apache Public License
 * Please see the LICENSE included with this distribution for details.
 *
 * WARNING: This is generated code. Do not modify. Your changes *will* be lost.
 */

#import <Foundation/Foundation.h>
#import "TiUtils.h"
#import "ApplicationDefaults.h"

@implementation ApplicationDefaults

+ (NSMutableDictionary*) copyDefaults
{
	NSMutableDictionary * _property = [[NSMutableDictionary alloc] init];
	
	[_property setObject:[TiUtils stringValue:@"Bh3aoaNwdoPzQlx15zgAvqAPPQdJIzCI"] forKey:@"acs-oauth-secret-production"];
	[_property setObject:[TiUtils stringValue:@"INiBSLniXvj542HFAkLj4M2Pfl9SSgGl"] forKey:@"acs-oauth-key-production"];
	[_property setObject:[TiUtils stringValue:@"a9BF4tRt4DCVsD0LceHPnUHSgiV4RLzX"] forKey:@"acs-api-key-production"];
	[_property setObject:[TiUtils stringValue:@"83ZPYWbRtOwur1Eki5FXurqvzZGnLIQD"] forKey:@"acs-oauth-secret-development"];
	[_property setObject:[TiUtils stringValue:@"NB6pHM3EIVnkLDGQmKJ9wNn3ytNKKaPL"] forKey:@"acs-oauth-key-development"];
	[_property setObject:[TiUtils stringValue:@"6vXpo4jamBZfQqnUbSAcPFOf5RTNAejr"] forKey:@"acs-api-key-development"];
	[_property setObject:[TiUtils stringValue:@"system"] forKey:@"ti.ui.defaultunit"];
	return _property;
}

@end